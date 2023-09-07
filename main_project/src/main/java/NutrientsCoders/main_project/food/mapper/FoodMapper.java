package NutrientsCoders.main_project.food.mapper;

import NutrientsCoders.main_project.food.dto.FoodPatchDto;
import NutrientsCoders.main_project.food.dto.FoodPostDto;
import NutrientsCoders.main_project.food.dto.FoodResponseDto;
import NutrientsCoders.main_project.food.entity.Food;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FoodMapper {
  List<FoodResponseDto> foodToFoodResponseDtos(List<Food> foods);
  
  FoodResponseDto foodToFoodResponseDto(Food food);
  
  Food foodPostDtoToFood(FoodPostDto foodDto);
  
  Food foodPatchDtoToFood(FoodPatchDto foodPatchDto);
}
