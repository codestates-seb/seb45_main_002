package NutrientsCoders.main_project.food.service;

import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.repository.FoodRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
  private final FoodRepository foodRepository;
  
  public FoodService(FoodRepository foodRepository) {
    this.foodRepository = foodRepository;
  }
  
  public List<Food> findFoods() {
    return foodRepository.findAll(Sort.by("foodId").descending()));
  }
  
  public Page<Food> findSearchWordFoods(String searchWord) {
  }
//  public Food createFood(Food food) {
//    return foodRepository.save(food);
//  }
//
//  public Food updateFood(Food food) {
//    return foodRepository.save(food);
//  }

//  public Food findFood(long foodId) {
//    return findVerifiedFood(foodId);
//  }

//
//  public void deleteFood(long foodId) {
//    Food findFood = findVerifiedFood(foodId);
//
//    foodRepository.delete(findFood);
//  }
  
//  public Food findVerifiedFood(long foodId) {
//    Optional<Food> optionalFood =
//        foodRepository.findById(foodId);
//    Food findFood =
//        optionalFood.orElseThrow(() ->
//            new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//    return findFood;
//  }
  
//  private void verifyExistsEmail(String email) {
//    Optional<Food> food = foodRepository.findByEmail(email);
//    if (food.isPresent())
//      throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
//  }
}
