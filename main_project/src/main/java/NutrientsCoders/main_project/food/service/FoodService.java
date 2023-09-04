package NutrientsCoders.main_project.food.service;

import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.repository.FoodRepository;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
  private final FoodRepository foodRepository;
  
  public FoodService(FoodRepository foodRepository) {
    this.foodRepository = foodRepository;

  }

  //키워드로 음식 검색(브랜드 포함, 커스텀 용)
  public List<Food> findBySearchWordFood_Custom(String searchWord) {
    Pageable pageable = PageRequest.of(0, 5);
    return foodRepository.findBySearchWordFood_Custom(searchWord, pageable).getContent();
  }

  //영양소로 음식 검색(top 10, 브랜드 비 포함)
  public List<Food> findByHighestNutrient(String nutrientType) {
    Pageable pageable = PageRequest.of(0, 10);
    List<Food> foods = foodRepository.findTop5ByHighestNutrient(nutrientType, pageable).getContent();
    return foods;
  }

  //키워드로 음식 검색(브랜드 비 포함, 식단 추천용)
  public List<Food> findSearchWordFoods(String searchWord) {
    Pageable pageable = PageRequest.of(0, 5);
    return foodRepository.findBySearchWordFood(searchWord, pageable).getContent();
  }
  //Id로 음식 검색
  public Food findByFood(long foodId) { return verifyExistsFood(foodId);}
  
  private Food verifyExistsFood(long foodId) {
    Optional<Food> optionalFood = foodRepository.findByFoodId(foodId);
    return optionalFood.orElseThrow(() -> new LogicException(ExceptionCode.FOOD_NOT_FOUND));
  }
  
  
////========================================== 커스텀 부분, memberId 어떻게 쓸것인지 생각해보기(문자열로 만들기?)
//  //커스텀 음식 저장
//  public Food createCustomFood(Food food, long memberId) {
//    return foodRepository.save(food);
//  }
//  //커스텀 음식 수정
//  public Food updateCustomFood(Food food, long foodId, long memberId) {
//    return foodRepository.save(food);
//  }
//
//  //커스텀 음식 삭제
//  public void deleteCustomFood(long foodId, long memberId) {
//        foodRepository.deleteById(foodId);
//  }


}
