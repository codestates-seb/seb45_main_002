package NutrientsCoders.main_project.food.controller;

import NutrientsCoders.main_project.food.dto.FoodResponseDto;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.mapper.FoodMapper;
import NutrientsCoders.main_project.food.service.FoodService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
  
  @GetMapping("/search/nutrients")
  public ResponseEntity getFoodSearch(@RequestParam(value = "search-word" ) String searchWord) {
    Page<Food> pageOrders = foodService.findSearchWordFoods(searchWord);
    List<Food> foods = pageOrders.getContent();
    List<FoodResponseDto> response = foodMapper.foodToFoodResponseDtos(foods);
    
    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
//  @GetMapping
//  public ResponseEntity getFoods(@Positive @RequestParam int page,
//                                 @Positive @RequestParam int size) {
//    Page<Food> pageFoods = foodService.findFoods(page - 1, size);
//    List<Food> foods = pageFoods.getContent();
//
//    return new ResponseEntity<>(foodMapper.foodToFoodResponseDto(food),
//        HttpStatus.OK);
//  }

//  @PostMapping
//  public ResponseEntity postFood(@Valid @RequestBody FoodPostDto foodDto) {
//    Food food = foodService.createFood(foodMapper.foodPostDtoToFood(foodDto));
//
//    return new ResponseEntity<>(foodMapper.foodToFoodResponseDto(food),
//        HttpStatus.OK);
//  }
//
//  @PatchMapping("/{food-id}")
//  public ResponseEntity patchFood(
//      @PathVariable("food-id") @Positive long foodId,
//      @Valid @RequestBody FoodPatchDto foodPatchDto) {
//    foodPatchDto.setFoodId(foodId);
//
//    Food food =
//        foodService.updateFood(foodMapper.foodPatchDtoToFood(foodPatchDto));
//
//    return new ResponseEntity<>(foodMapper.foodToFoodResponseDto(food),
//        HttpStatus.OK);
//  }
//
//  @DeleteMapping("/{food-id}")
//  public ResponseEntity deleteFood(
//      @PathVariable("food-id") @Positive long foodId) {
//    foodService.deleteFood(foodId);
//
//    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//  }
  
}
