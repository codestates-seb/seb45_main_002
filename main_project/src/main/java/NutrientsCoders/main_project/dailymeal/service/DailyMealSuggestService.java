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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
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
    cannotSuggest(dailyMeal, remainKcal); //제안 가능 여부 확인
    dailyMeal.setMember(member);
    
    List<EachMeal> eachMeals = createSuggestEachMeals(remainKcal, dailyMeal);
    dailyMeal.setName("당신을 위한 추천 식단");
    dailyMeal.setEachMeals(eachMealRepository.saveAll(eachMeals));
    dailyMeal.calculateTotal();
    return dailyMealRepository.save(dailyMeal);
  }

  //eachMeals 생성
  List<EachMeal> createSuggestEachMeals(Double remainKcal, DailyMeal dailyMeal) {
    List<EachMeal> eachMeals = dailyMeal.getEachMeals();
    boolean hasBreakfast = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 1);
    boolean hasLunch = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 2);
    boolean hasDinner = eachMeals.stream().anyMatch(eachMeal -> eachMeal.getTimeSlot() == 3);
    Boolean[] createEachType = {true, hasBreakfast, hasLunch, hasDinner};
    int eachRemainKcal = (int) (remainKcal / (3 - dailyMeal.getEachMeals().stream().count()));
    
    //초기 비율을 확인합니다
    Double[] baseMacrosPercent = {dailyMeal.getTotalPercentCarbos(),
                                  dailyMeal.getTotalPercentProteins(),
                                  dailyMeal.getTotalPercentFats()
    };
    
    String[][] category = {
            {"10520", "쌀밥.잡곡밥류", "김치", "반찬1", "반찬2", "국"},
            {"10520", "죽류", "김치", "반찬1", "반찬2", "국"},
            {"10500", "비빔밥류", "김치", "반찬1", null, "국"},
            {"10500", "볶음밥류", "김치", "반찬1", null, "국"},
            {"10500", "기타 밥류", "김치", "반찬1", null, "국"},
            {"10500", "김밥류", "김치", "반찬1", null, "국"},
            {"10500", "기타 국밥류", "김치", "반찬1", null, null},
            {"10500", "국수류", "김치", "반찬1", null, null},
            {"10500", "기타 국밥류", "김치", "반찬1", null, "크림빵류" },
            {"10500", "국수류", "김치", "반찬1", null, "기타 빵류"},
            {"10160", "비빔밥류", null, "스프류", "샐러드", null},
            {"10160", "김밥류", null, "스프류", "샐러드", null},
            {"10160", "죽류", null, "스프류", "샐러드", "샌드위치류"},
            {"10160", "기타 밥류", null, "스프류", "샐러드", "앙금빵류"},
            {"10160", "기타 밥류", null, "스프류", "샐러드", "식빵류"},
            {"10160", "쌀밥.잡곡밥류", null, "스프류", "샐러드", "페이스트리류"},
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
        "채소류찜", "채소류조림", "채소류볶음", "채소류구이", "젓갈류", "장아찌.절임류",
        "나물.채소류무침", "나물.숙채류", "기타 튀김류", "기타 찜류", "기타 조림류",
        "기타 전.적", "기타 생채.무침류", "기타 볶음류", "장아찌.절임류"
    };
    
    for (int i = 1; i <= 3; i++) {
      if (!createEachType[i]) {
        EachMeal eachMeal = suggestEachMeal(baseMacrosPercent, Integer.toString(i), eachRemainKcal,
            category, soup, side1, side2);
        eachMeal.setTimeSlot(i);
        eachMeal.setMember(dailyMeal.getMember());
        eachMeal.setDailyMeal(dailyMeal);
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
    String orderbyDsce = "-protein";
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
      int quantityInt = Integer.parseInt(quantityString[i - 1]);
      if (quantityInt == 0) {
        limitKcal = remainKcal - eachMeal.getTotalEachKcal(); //남은 칼로리
        if (limitKcal < 0) {
          break;
        }
      } else {
        limitKcal = (quantityInt / 10.0) * baseRemainKcal; //비율
      }

      //카테고리별로 음식 랜덤 선택
      PageRequest pageable = PageRequest.of(0, 5);
      List<Food> foodList = new ArrayList<>();
      Food randomFood = new Food();
      //foodList 에서 문제 **
      if (breakfast.equals("1")) {
        foodList = changeOrderByBreakfast(category, breakfast, orderbyDsce, pageable).getContent();
        if (foodList.isEmpty()) {
          i = i - 1;
          selectNum = random.nextInt(allCategory.length);
          continue;
        }
        randomFood = foodList.get(random.nextInt(foodList.size()));
      } else {
        foodList = changeOrderBy(category,orderbyDsce,pageable).getContent();
        if (foodList.isEmpty()) {
          i -= 1;
          selectNum = random.nextInt(allCategory.length);
          continue;
        }
        randomFood = foodList.get(random.nextInt(foodList.size()));
      }

      //비율 보정
      if (i > 2 && randomFood.getCarboRate() > randomFood.getProteinRate()) {
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
      if (i > 4 && eachMeal.getTotalPercentCarbo() > 0.5 && eachMeal.getTotalPercentProtein() < 0.3 && eachMeal.getTotalPercentFat() > 0.2) {
        selectNum = random.nextInt(allCategory.length);
        i = 0;
        continue;
      }

      //음식 추가 후 부족한 비율 확인
      orderbyDsce = findOrderType(eachMeal, baseMacrosPercent);
      remainKcal -= eachMeal.getTotalEachKcal();
    }
    
    //칼로리 보정(단백질 위주)
    while (eachMeal.getTotalEachKcal() < baseRemainKcal - 100){
      eachMeal.getEachMealFoods().stream().forEach(eachMealFood -> {
        eachMealFood.setQuantity(eachMealFood.getQuantity() + 0.1);
        eachMealFood.calculateRate();
      });
      EachMealFood highestProteinFood =
          eachMeal.getEachMealFoods().stream()
                  .max(Comparator.comparingDouble(EachMealFood::getRateProtein))
                  .orElse(null);
      
      highestProteinFood.setQuantity(highestProteinFood.getQuantity() + 0.15);
      highestProteinFood.calculateRate();
      
      eachMeal.calculateTotal();
    }
    
    return eachMeal;
  }

  private Page<Food> changeOrderBy(String category, String orderByDesc, PageRequest pageable){
    switch (orderByDesc) {
      case "-carbo":
        return foodRepository.findInCategoryOrderByCarboDesc(category, pageable);
      case "-protein":
        return foodRepository.findInCategoryOrderByProteinDesc(category, pageable);
      case "-fat":
        return foodRepository.findInCategoryOrderByFatDesc(category, pageable);
      case "+carbo":
        return foodRepository.findInCategoryOrderByCarboAsc(category, pageable);
      case "+protein":
        return foodRepository.findInCategoryOrderByProteinAsc(category, pageable);
      case "+fat":
        return foodRepository.findInCategoryOrderByFatAsc(category, pageable);
      default:
        return foodRepository.findInCategoryOrderByCarboDesc(category, pageable);
    }
  }

  private Page<Food> changeOrderByBreakfast(String category,String timeslot, String orderByDesc, PageRequest pageable){
    switch (orderByDesc) {
      case "-carbo":
        return foodRepository.findInCategoryAndBreakfastOrderByCarboDesc(category,timeslot, pageable);
      case "-protein":
        return foodRepository.findInCategoryAndBreakfastOrderByProteinDesc(category,timeslot, pageable);
      case "-fat":
        return foodRepository.findInCategoryAndBreakfastOrderByFatDesc(category,timeslot, pageable);
      case "+carbo":
        return foodRepository.findInCategoryAndBreakfastOrderByCarboAsc(category,timeslot, pageable);
      case "+protein":
        return foodRepository.findInCategoryAndBreakfastOrderByProteinAsc(category,timeslot, pageable);
      case "+fat":
        return foodRepository.findInCategoryAndBreakfastOrderByFatAsc(category,timeslot, pageable);
      default:

        return foodRepository.findInCategoryAndBreakfastOrderByCarboDesc(category,timeslot, pageable);
    }

  }

  private String findOrderType(EachMeal eachMeal, Double[] baseMacrosPercent) {
    Double[] targetMacros = {0.5, 0.3, 0.2};
    
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
    } else if (absMax == Math.abs(diffProtein)) {
      if (diffProtein < 0) return orderbyDsce[1];
      else return orderbyDsce[4];
    } else {
      if (diffFat < 0) return orderbyDsce[2];
      else return orderbyDsce[5];
    }
  }
  
  private void cannotSuggest(DailyMeal dailyMeal, Double remainKcal) {
    long num = dailyMeal.getEachMeals().size(); //포함 끼니 갯수
    long eachRemainKcal = (long) (remainKcal / (3 - num));
    if (num == 3) {
      System.out.println("끼니가 적어도 한개 이상 비워져 있어야 추천을 받을 수 있습니다");
      throw new LogicException(ExceptionCode.MEAL_ALREADY_FULL);
    }
      if (eachRemainKcal < 500) {
        System.out.println("남은 끼니당 칼로리가 적어도 500kcal 이상일 때에만 추천 받을 수 있습니다");
        throw new LogicException(ExceptionCode.CALORIE_TOO_LOW);
      }
    }
  }



