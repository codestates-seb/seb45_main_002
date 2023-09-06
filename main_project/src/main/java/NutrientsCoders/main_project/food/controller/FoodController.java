package NutrientsCoders.main_project.food.controller;

import NutrientsCoders.main_project.food.dto.FoodResponseDto;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.mapper.FoodMapper;
import NutrientsCoders.main_project.food.service.FoodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class FoodController {
  private final FoodService foodService;
  private final FoodMapper foodMapper;
  
  public FoodController(FoodService foodService, FoodMapper foodMapper) {
    this.foodService = foodService;
    this.foodMapper = foodMapper;
  }
  
  //키워드로 음식 리스트 검색(브랜드 비 포함)
  @GetMapping("/search/foods")
  public ResponseEntity<List<FoodResponseDto>> getFoodSearchKeyword(@RequestParam(value = "search-word" ) String searchWord) {
    List<Food> foods = foodService.findBySearchWordFood_Custom(searchWord);
    List<FoodResponseDto> response = foodMapper.foodToFoodResponseDtos(foods);

    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  //영양소로 음식 리스트 검색(브랜드 비 포함)
  @GetMapping("/search/nutrients")
  public ResponseEntity<List<FoodResponseDto>> getFoodSearchNutrient(@RequestParam(value = "search-word" ) String searchWord) {
    List<Food> foods = foodService.findByHighestNutrient(searchWord);
    List<FoodResponseDto> response = foodMapper.foodToFoodResponseDtos(foods);

    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  //선택 음식 조회
  @GetMapping("/foods/{food-id}")
  public ResponseEntity<FoodResponseDto> getFoodSearchFoodId(@PathVariable("food-id") long foodId) {
    Food food = foodService.findByFood(foodId);
    FoodResponseDto response = foodMapper.foodToFoodResponseDto(food);
    
    return new ResponseEntity<>(response,HttpStatus.OK);
  }
}
