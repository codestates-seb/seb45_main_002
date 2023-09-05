package NutrientsCoders.main_project.eachmeal.service;

import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.eachmeal.repository.EachMealFoodRepository;
import NutrientsCoders.main_project.eachmeal.repository.EachMealRepository;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.service.FoodService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EachMealService {  
  private final EachMealRepository eachMealRepository;
  private final FoodService foodService;
  private final EachMealFoodRepository eachMealFoodRepository;
  
  public EachMealService(EachMealRepository eachMealRepository, FoodService foodService, EachMealFoodRepository eachMealFoodRepository) {
    this.eachMealRepository = eachMealRepository;
    this.eachMealFoodRepository = eachMealFoodRepository;
    this.foodService = foodService;
  }
  
  //foodId로 food 엔티티를 찾아 끼니 저장
  @Transactional
  public EachMeal createEachMeal(EachMeal eachMeal, List<EachMealFood> eachMealFoods) {
    eachMealFoods = eachMealFoodsfindFood(eachMealFoods, eachMeal);
    eachMeal.setEachMealFoods(eachMealFoods);
    
    return eachMealRepository.save(eachMeal);
  }
  //선택 끼니 조회
  public EachMeal findByEachMeal(long eachMealId) {
    
    return verifyExistsEachMeal(eachMealId);
  }
  
  @Transactional
  //선택 끼니 수정
  public EachMeal updateEachMeal(EachMeal eachMeal, List<EachMealFood> newEachMealFoods, long eachMealId) {
    EachMeal findEachMeal = verifyExistsEachMeal(eachMealId);

    List<EachMealFood> eachMealFoodsfindFood = eachMealFoodsfindFood(newEachMealFoods, eachMeal);
    findEachMeal.setEachMealFoods(eachMealFoodsfindFood);
    findEachMeal.getEachMealFoods().forEach(eachMealFood -> eachMealFood.setEachMeal(findEachMeal));
    
    return eachMealRepository.save(findEachMeal);
  }
  
  //선택 끼니 삭제
  @Transactional
  public void deleteEachMeal(long eachMealId) {
    eachMealRepository.deleteById(eachMealId);
  }
  
  
  //전체 eachMealFood 목록 삭제
  @Transactional
  public void deleteEachMealFoods(long eachMealId) {
    eachMealFoodRepository.deleteEachMealFoodsByEachMeal_EachMealId(eachMealId);
  }
  
  private EachMeal verifyExistsEachMeal(long eachMealId) {
    Optional<EachMeal> optionalEachMeal = eachMealRepository.findByEachMealId(eachMealId);
    return optionalEachMeal.orElseThrow(() -> new LogicException(ExceptionCode.FOOD_NOT_FOUND));
  }
  //EachMeal-EachMealFood안의 FoodId값으로 Food객체를 찾은 후 비율을 분석하여 연결합니다
  private List<EachMealFood> eachMealFoodsfindFood(List<EachMealFood> eachMealFoods, EachMeal eachMeal) {
    
    return eachMealFoods.stream().map(eachMealFood -> {
      long foodId = eachMealFood.getFood().getFoodId();
      Food findFood  = foodService.findByFood(foodId);
      eachMealFood.setFood(findFood);
      eachMealFood.setEachMeal(eachMeal);
      eachMealFood.setRateKcal((long) (findFood.getKcal()*eachMealFood.getQuantity()));
      eachMealFood.setRateCarbo(findFood.getCarbo()*eachMealFood.getQuantity());
      eachMealFood.setRateProtein(findFood.getProtein()*eachMealFood.getQuantity());
      eachMealFood.setRateFat(findFood.getProtein()*eachMealFood.getQuantity());
      return eachMealFood;
    }).collect(Collectors.toList());
  }
}