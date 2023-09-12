package NutrientsCoders.main_project.dailymeal.service;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealRepository;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.eachmeal.repository.EachMealRepository;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.repository.FoodSuggestRepository;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class DailyMealSuggestService {
  private final DailyMealRepository dailyMealRepository;
  private final FoodSuggestRepository foodRepository;
  private final MemberService memberService;
  private final EachMealRepository eachMealRepository;
  private final DailyMealService dailyMealService;
  
  public DailyMealSuggestService(DailyMealRepository dailyMealRepository, DailyMealService dailyMealService,
                                 MemberService memberService, FoodSuggestRepository foodRepository, EachMealRepository eachMealRepository) {
    this.dailyMealRepository = dailyMealRepository;
    this.dailyMealService = dailyMealService;
    this.memberService = memberService;
    this.foodRepository = foodRepository;
    this.eachMealRepository = eachMealRepository;
  }
  
  //추천 식단 생성
  public DailyMeal suggestDailyMeal(long dailyMealId, long memberId) throws Exception {
    DailyMeal dailyMeal = dailyMealService.findByDailyMeal(dailyMealId, memberId);
    Member member = memberService.findMember(memberId);
    Double remainKcal = member.getNeedKcal() - dailyMeal.getTotalDailyKcal();
    dailyMeal = createSuggestDaily(dailyMeal, remainKcal);
    dailyMeal.getEachMeals().stream().forEach(eachMeal -> eachMeal.setMember(member));
    dailyMeal.setMember(member);
    dailyMeal.calculateTotal();
    return dailyMealRepository.save(dailyMeal);
  }
  
  //dailyMeal 생성
  private DailyMeal createSuggestDaily(DailyMeal dailyMeal, Double remainKcal) throws Exception {
    cannotSuggest(dailyMeal, remainKcal); //제안 가능 여부 확인
    List<EachMeal> eachMeals = createSuggestEachMeals(remainKcal, dailyMeal);
    dailyMeal.setEachMeals(eachMealRepository.saveAll(eachMeals));
  
    return dailyMeal;
  }
  
  //eachMeals 생성
  List<EachMeal> createSuggestEachMeals(Double remainKcal, DailyMeal dailyMeal) {
    List<EachMeal> eachMeals = dailyMeal.getEachMeals();
    boolean hasBreakfast = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 1);
    boolean hasLunch = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 2);
    boolean hasDinner = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 3);
    Boolean[] createEachType = {true, hasBreakfast, hasLunch, hasDinner};
    int eachRemainKcal = (int) (remainKcal/(3-dailyMeal.getEachMeals().stream().count()));
    
    //초기 비율을 확인합니다
    Double[] baseMacrosPercent = {dailyMeal.getTotalPercentCarbos(),
                                  dailyMeal.getTotalPercentProteins(),
                                  dailyMeal.getTotalPercentFats()
    };
    
    String[][] category = {
        {"412120", "쌀밥.잡곡밥류", "김치", "반찬1", "반찬2", "국", "간식"},
        {"511120", "죽류", "김치", "반찬1", "반찬2", "국", "간식"},
        {"612010", "비빔밥류", "김치", "반찬2", null, "국", "간식"},
        {"612010", "볶음밥류", "김치", "반찬2", null, "국", "간식"},
        {"612010", "덮밥류", "김치", "반찬2", null, "국", "간식"},
        {"612010", "기타 밥류", "김치", "반찬2", null, "국", "간식"},
        {"612010", "김밥류", "김치", "반찬2", null, "국", "간식"},
        {"711010", "기타 국밥류", "김치", "반찬2", null, null,"간식"},
        {"811000", "중식면류", "김치", "장아찌.절임류", null, null, "간식"},
        {"811000", "스파게티류", "김치", "장아찌.절임류", null, null, "간식"},
        {"811000", "국수류", "김치", "장아찌.절임류", null, null,"간식"},
        {"502200", "기타 빵류", null, "스프류", "샐러드", null,"간식"},
        {"502200", "샌드위치류", null, "스프류", "샐러드", null,"간식"},
        {"502200", "식빵류", null, "스프류", "샐러드", null,"간식"},
        {"502200", "앙금빵류", null, "스프류", "샐러드", null,"간식"},
        {"502200", "크림빵류", null, "스프류", "샐러드", null,"간식"},
        {"502200", "페이스트리류", null, "스프류", "샐러드", null,"간식"},
    };
    
    String[] soup = {"채소류찌개.전골", "채소류국.탕", "육류찌개.전골", "육류국.탕",
                     "어패류찌개.전골", "어패류국.탕", "냉국류", "기타 국류"
    };
    
    String[] side1 = {
        "채소류튀김", "채소류전", "적류", "육류튀김", "육류찜", "육류조림", "육류전",
        "육류볶음", "육류구이", "어패류튀김", "어패류찜", "어패류조림", "어패류전",
        "어패류볶음", "어패류무침", "어패류구이"
    };
    
    String[] side2 = {
        "채소류찜", "채소류조림", "채소류볶음","채소류구이", "젓갈류","장아찌.절임류",
        "나물.채소류무침","나물.숙채류", "기타 튀김류","기타 찜류", "기타 조림류",
        "기타 전.적", "기타 생채.무침류","기타 볶음류"
    };
    
    String[] dessert = {
        "한과류", "빙수류", "떡볶이류", "떡류", "도넛류", "기타 음료류", "곡류 및 서류"
    };
    
    for (int i = 1; i <= 3; i++) {
      if (!createEachType[i]) {
        EachMeal eachMeal = suggestEachMeal(baseMacrosPercent, Integer.toString(i), eachRemainKcal,
            category, soup, side1, side2, dessert);
        eachMeal.setTimeSlot(i);
        eachMeals.add(eachMeal);
      }
    }
    return eachMeals;
  }
  
  
  EachMeal suggestEachMeal(Double[] baseMacrosPercent, String timeSlot, long eachRemainKcal, String[][] allCategory,
                           String[] soup, String[] side1, String[] side2, String[] dessert) {
    Random random = new Random();
    String orderbyDsce = "-Protein";
    int selectNum = random.nextInt(allCategory.length);
    EachMeal eachMeal = new EachMeal();
    
    for (int i = 1; i < allCategory[selectNum].length; i++) {
      String category = allCategory[selectNum][i];
      if (category == null) continue;
      if (category.equals("반찬1")) {
        category = side1[random.nextInt(side1.length)];
      } else if (category.equals("반찬2")) {
        category = side2[random.nextInt(side2.length)];
      } else if (category.equals("국")) {
        category = soup[random.nextInt(soup.length)];
      } else if (category.equals("간식")) {
        category = dessert[random.nextInt(dessert.length)];
      }
      
      Double limitKacl;
      String[] quantityString = allCategory[selectNum][0].split("");
      int quantityInt = Integer.parseInt(quantityString[i]);
      if (quantityInt == 0 ) {
        limitKacl = eachRemainKcal - eachMeal.getTotalEachKcal(); //남은 칼로리
      } else {
        limitKacl = (quantityInt / 10.0) * eachRemainKcal; //비율
      }
      
      //카테고리별로 음식 랜덤 선택
      PageRequest pageable = PageRequest.of(0, 5);
      List<Food> foodList = new ArrayList<>();
      Food randomFood = new Food();
      
      if (timeSlot.equals("1")) { //아침은 디저트x
        foodList = foodRepository.findInCategoryBreackFast(category, timeSlot, orderbyDsce, pageable).getContent();
        randomFood = foodList.get(random.nextInt(foodList.size()));
      } else {
        foodList = foodRepository.findInCategoryOther(category, orderbyDsce, pageable).getContent();
        randomFood = foodList.get(random.nextInt(foodList.size()));
      }
      // limitkacl, 타입 정렬 구현하기
      
      Double quantity =  limitKacl/randomFood.getKcal(); //제한 칼로리 대비 제공량 설정
      EachMealFood eachMealFood = new EachMealFood(randomFood, quantity);
      eachMealFood.calculateRate();
      eachMeal.getEachMealFoods().add(eachMealFood);
      
      //음식 추가 후 부족한 비율 확인
      orderbyDsce = findOrderType(eachMeal, baseMacrosPercent);
    }
    
    
      return eachMeal;
    }
    
    
  private String findOrderType(EachMeal eachMeal, Double[] baseMacrosPercent) {
    Double[] targetMacros = {0.3 , 0.5 , 0.2};
    
    eachMeal.calculateTotal();
    baseMacrosPercent[0] = (baseMacrosPercent[0] + eachMeal.getTotalPercentCarbo()) / 2;
    baseMacrosPercent[1] = (baseMacrosPercent[0] + eachMeal.getTotalPercentProtein()) / 2;
    baseMacrosPercent[2] = (baseMacrosPercent[0] + eachMeal.getTotalPercentFat()) / 2;
    
    //음수면 부족, 양수면 초과
    Double diffCarbo = baseMacrosPercent[0] - targetMacros[0];
    Double diffProtein = baseMacrosPercent[1] - targetMacros[1];
    Double diffFat = baseMacrosPercent[2] - targetMacros[2];
    
    Double absMax = Math.max(Math.abs(diffCarbo), Math.max(Math.abs(diffProtein), Math.abs(diffFat)));
    
    String[] orderbyDsce = {"-carbo", "-protein", "-fat", "+carbo", "+protein", "+fat"};
    
    if (absMax == Math.abs(diffCarbo)) {
      if (diffCarbo < 0) return orderbyDsce[0];
      else return orderbyDsce[3];
    }
    else if (absMax == Math.abs(diffProtein)) {
      if (diffProtein < 0) return orderbyDsce[1];
      else return orderbyDsce[4];
    }
    else {
      if (diffFat < 0) return orderbyDsce[2];
      else return orderbyDsce[5];
    }
  }
  
  private void cannotSuggest(DailyMeal dailyMeal, Double remainKacl) {
    long num = dailyMeal.getEachMeals().stream().count(); //포함 끼니 갯수
    long eachRemainKacl = (long) (remainKacl/(3-num));
    if (num == 3){
      new LogicException(ExceptionCode.MEAL_ALREADY_FULL);
      System.out.println("끼니가 적어도 한개 이상 비워져 있어야 추천을 받을 수 있습니다");
      new Exception();}
    
    
    if (eachRemainKacl < 500){
      System.out.println("남은 끼니당 칼로리가 적어도 500kacl 이상일 때에만 추천 받을 수 있습니다");
      new Exception();} //정리되면 추가하기
  }
}



