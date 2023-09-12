package NutrientsCoders.main_project.food.service;

import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.repository.FoodRepository;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
  private final FoodRepository foodRepository;
  
  public FoodService(FoodRepository foodRepository) {
    this.foodRepository = foodRepository;

  }

  //키워드로 음식 검색(브랜드 포함, 커스텀 용)
  public List<Food> findBySearchWordFood(String searchWord, long memberId) {
    Pageable pageable = PageRequest.of(0, 5);
    return foodRepository.findBySearchWordFood(searchWord, pageable).getContent();
  }

  //영양소로 음식 검색(top 10, 브랜드 비 포함)
  public List<Food> findByHighestNutrient(String nutrientType) {
    Pageable pageable = PageRequest.of(0, 10);
    return foodRepository.findTop5ByHighestNutrient(nutrientType, pageable).getContent();
  }
  //Id로 음식 검색
  public Food findByFood(long foodId) {
    Optional<Food> optionalFood = foodRepository.findByFoodId(foodId);
    return optionalFood.orElseThrow(() -> new LogicException(ExceptionCode.FOOD_NOT_FOUND));
  }

  //키워드로 음식 검색(브랜드 비 포함, 식단 추천용)
  public List<Food> findSearchWordFoods(String searchWord) {
    Pageable pageable = PageRequest.of(0, 5);
    return foodRepository.findBySearchWordFood(searchWord, pageable).getContent();
  }
  
  
//========================================== 커스텀 부분
  //커스텀 음식 저장
  public Food createCustomFood(Food food, long memberId) {
    String brand = "Custom"+memberId;
    food.setBrand(brand);
    food.setFoodCategory1("myfoods");
    food.setFoodCategory2("");
    return foodRepository.save(food);
  }
  //커스텀 음식 수정
  public Food updateCustomFood(Food food, long foodId, long memberId) {
    String brand = "Custom"+memberId;
    Food findFood = foodRepository.findByFoodId(foodId)
        .orElseThrow(() -> new LogicException(ExceptionCode.FOOD_NOT_FOUND));

    findFood.setFoodName(food.getFoodName());
    findFood.setServingSize(food.getServingSize());
    findFood.setKcal(food.getKcal());
    findFood.setFoodName(food.getFoodName());
    findFood.setCarbo(food.getCarbo());
    findFood.setProtein(food.getProtein());
    findFood.setFat(food.getFat());
    findFood.setEtcNutrients(food.getEtcNutrients());
    findFood.setBrand(brand);
    food.setFoodCategory1("myfoods");
    return foodRepository.save(findFood);
  }

  //커스텀 음식 삭제
  public void deleteCustomFood(long foodId) {
        foodRepository.deleteById(foodId);
  }


}
