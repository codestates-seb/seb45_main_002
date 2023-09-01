package NutrientsCoders.main_project.food.service;

import NutrientsCoders.main_project.food.entity.EtcNutrients;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.repository.EtcNutrientsRepository;
import NutrientsCoders.main_project.food.repository.FoodRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
  private final FoodRepository foodRepository;
  private final EtcNutrientsRepository etcNutrientsRepository;
  
  public FoodService(FoodRepository foodRepository, EtcNutrientsRepository etcNutrientsRepository) {
    this.foodRepository = foodRepository;
    this.etcNutrientsRepository = etcNutrientsRepository;
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
  
  public Food findByFood(long foodId) {
    Optional<Food> optionalFood = foodRepository.findByFoodId(foodId);
    Food findFood = optionalFood.orElseThrow(() -> new RuntimeException());
    
    etcNutrientsRepository.findById(findFood.getFoodId())
        .ifPresentOrElse(findFood::setEtcNutrients, () -> {
          throw new RuntimeException("EtcNutrients를 찾을 수 없습니다. foodId: " + foodId);
        });
    
    return findFood;
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
