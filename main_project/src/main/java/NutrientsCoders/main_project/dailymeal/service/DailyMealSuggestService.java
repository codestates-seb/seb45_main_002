package NutrientsCoders.main_project.dailymeal.service;

import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.Analysis.service.AnalysisService;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealRepository;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.eachmeal.repository.EachMealRepository;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.repository.FoodSuggestRepository;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.service.MemberService;
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
  private final AnalysisService analysisService;
  
  public DailyMealSuggestService(DailyMealRepository dailyMealRepository, DailyMealService dailyMealService,
                                 MemberService memberService, FoodSuggestRepository foodRepository, EachMealRepository eachMealRepository, AnalysisService analysisService) {
    this.dailyMealRepository = dailyMealRepository;
    this.dailyMealService = dailyMealService;
    this.memberService = memberService;
    this.foodRepository = foodRepository;
    this.eachMealRepository = eachMealRepository;
    this.analysisService = analysisService;
  }
  
  //추천 식단 생성
  public DailyMeal suggestDailyMeal(long analysisId, long memberId) throws Exception {
    Analysis analysis = analysisService.findByAnalysis(analysisId);
    Member member = memberService.findMember(memberId);
    DailyMeal dailyMeal = dailyMealService.findByDailyMeal(analysis.getDailyMeal().getDailyMealId(), memberId);
    dailyMeal = createSuggestDaily(analysis, dailyMeal);
    dailyMeal.getEachMeals().forEach(eachMeal -> eachMeal.setMember(member));
    dailyMeal.setMember(member);
    dailyMeal.calculateTotal();
    return dailyMealRepository.save(dailyMeal);
  }
  
  //dailyMeal 생성
  private DailyMeal createSuggestDaily(Analysis analysis, DailyMeal dailyMeal) {
    cannotSuggest(dailyMeal, analysis.getOverKcal()); //제안 가능 여부 확인
    List<EachMeal> eachMeals = createSuggestEachMeals(analysis, dailyMeal.getEachMeals());
    dailyMeal.setEachMeals(eachMealRepository.saveAll(eachMeals));
  
    return dailyMeal;
  }
  
  //eachMeals 생성
  List<EachMeal> createSuggestEachMeals(Analysis analysis, List<EachMeal> eachMeals) {
    boolean hasBreakfast = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 1);
    boolean hasLunch = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 2);
    boolean hasDinner = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 3);
    Boolean[] createEachType = {true, hasBreakfast, hasLunch, hasDinner};
    int eachRemainKcal = (int) ((-1*analysis.getOverKcal())/(3-eachMeals.stream().count()));
    
    //초기 비율을 확인합니다
    Double[] baseMacrosPercent = {analysis.getPercentCarbos(),
                               analysis.getPercentProteins(),
                               analysis.getPercentFats()};
    
    String[][] category = {
        {"10520", "쌀밥.잡곡밥류", "김치", "반찬1", "반찬2", "국"},
        {"10520", "죽류", "김치", "반찬1", "반찬2", "국"},
        {"10500", "비빔밥류", "김치", "반찬1", null, "국"},
        {"10500", "볶음밥류", "김치", "반찬1", null, "국"},
        {"10500", "기타 밥류", "김치", "반찬1", null, "국"},
        {"10500", "김밥류", "김치", "반찬1", null, "국"},
        {"10500", "기타 국밥류", "김치", "반찬1", null, null},
        {"10500", "국수류", "김치", "반찬1", null, null},
        {"10160", "기타 빵류", null, "스프류", "샐러드", null},
        {"10160", "샌드위치류", null, "스프류", "샐러드", null},
        {"10160", "식빵류", null, "스프류", "샐러드", null},
        {"10160", "앙금빵류", null, "스프류", "샐러드", null},
        {"10160", "크림빵류", null, "스프류", "샐러드", null},
        {"10160", "페이스트리류", null, "스프류", "샐러드", null},
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
        "기타 전.적", "기타 생채.무침류","기타 볶음류", "장아찌.절임류"
    };
    
    for (int i = 1; i <= 3; i++) {
      if (!createEachType[i]) {
        EachMeal eachMeal = suggestEachMeal(baseMacrosPercent, Integer.toString(i), eachRemainKcal,
            category, soup, side1, side2);
        eachMeal.setTimeSlot(i);
        eachMeals.add(eachMeal);
      }
    }
    return eachMeals;
  }
  
  // EachMeal 을 만드는 작업
  EachMeal suggestEachMeal(Double[] baseMacrosPercent, String breakfast, long baseRemainKcal, String[][] allCategory,
                           String[] soup, String[] side1, String[] side2) {
    long remainKcal = baseRemainKcal;
    Random random = new Random();
    String orderbyDsce = "-Protein";
    int selectNum = random.nextInt(allCategory.length);
    EachMeal eachMeal = new EachMeal();
    List<EachMealFood> eachMealFoods = new ArrayList<>();
    eachMeal.setEachMealFoods(eachMealFoods);
    
    for (int i = 1; i < allCategory[selectNum].length; i++) {
      String category = allCategory[selectNum][i];
      if (category == null) continue;
      switch (category) {
        case "반찬1":
          category = side1[random.nextInt(side1.length)];
          break;
        case "반찬2":
          category = side2[random.nextInt(side2.length)];
          break;
        case "국":
          category = soup[random.nextInt(soup.length)];
          break;
      }
      
      double limitKcal;
      String[] quantityString = allCategory[selectNum][0].split("");
      int quantityInt = Integer.parseInt(quantityString[i-1]);
      if (quantityInt == 0) {
        limitKcal = remainKcal - eachMeal.getTotalEachKcal(); //남은 칼로리
        if (limitKcal <  0){break;}
      } else {
        limitKcal = (quantityInt / 10.0) * baseRemainKcal; //비율
      }
      
      //카테고리별로 음식 랜덤 선택
      PageRequest pageable = PageRequest.of(0, 5);
      List<Food> foodList = new ArrayList<>();
      Food randomFood = new Food();
      //foodList 에서 문제 **
      if (breakfast.equals("1")) {
        foodList = foodRepository.findInCategoryBreakfast(category, orderbyDsce, pageable).getContent();
        if (foodList.isEmpty()) {
          i = i - 1;
          selectNum = random.nextInt(allCategory.length);
          continue;
        }
        randomFood = foodList.get(random.nextInt(foodList.size()));
      } else {
        foodList = foodRepository.findInCategoryOther(category, orderbyDsce, pageable).getContent();
        if (foodList.isEmpty()) {
          i -= 1;
          selectNum = random.nextInt(allCategory.length);
          continue;
        }
        randomFood = foodList.get(random.nextInt(foodList.size()));
      }
      
      //비율 보정
      if (i > 2  && randomFood.getCarboRate() > randomFood.getProteinRate()) {
        selectNum = random.nextInt(allCategory.length);
        i -= 1;
        continue;
      }
      
      double quantity = 1.0;
      if (randomFood.getKcal() > limitKcal) {
        quantity = limitKcal / randomFood.getKcal(); //제한 칼로리 대비 제공량 설정
      }
      EachMealFood eachMealFood = new EachMealFood();
      eachMealFood.setFood(randomFood);
      eachMealFood.setQuantity(quantity);
      eachMealFood.calculateRate();
      eachMeal.getEachMealFoods().add(eachMealFood);
      eachMeal.calculateTotal();
      
      
      //비율 보정 2
      if (i > 4 && eachMeal.getTotalPercentCarbo() > 0.35 && eachMeal.getTotalPercentProtein() < 0.5 && eachMeal.getTotalPercentFat() > 0.2) {
        selectNum = random.nextInt(allCategory.length);
        i = 0;
        continue;
      }
      
      //음식 추가 후 부족한 비율 확인
      orderbyDsce = findOrderType(eachMeal, baseMacrosPercent);
      remainKcal -= eachMeal.getTotalEachKcal();
    }
      //칼로리 보정
      while (baseRemainKcal - eachMeal.getTotalEachKcal() > 50){
        eachMeal.getEachMealFoods().stream().forEach(eachMealFood -> {
          if (eachMealFood.getRateProtein() > eachMealFood.getRateCarbo()) {
            eachMealFood.setQuantity(eachMealFood.getQuantity() + 0.03);
            eachMealFood.calculateRate();
          }
        });
        eachMeal.calculateTotal();
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
    double diffCarbo = baseMacrosPercent[0] - targetMacros[0];
    double diffProtein = baseMacrosPercent[1] - targetMacros[1];
    double diffFat = baseMacrosPercent[2] - targetMacros[2];
    
    double absMax = Math.max(Math.abs(diffCarbo), Math.max(Math.abs(diffProtein), Math.abs(diffFat)));
    
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
    long baseRemainKacl = (long) (remainKacl/(3-num));
    if (num == 3){
      System.out.println("끼니가 적어도 한개 이상 비워져 있어야 추천을 받을 수 있습니다");
      new Exception();}
    
    
    if (baseRemainKacl < 500){
      System.out.println("남은 끼니당 칼로리가 적어도 500kacl 이상일 때에만 추천 받을 수 있습니다");
      new Exception();} //정리되면 추가하기
  }
}



