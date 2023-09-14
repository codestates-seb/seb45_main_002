package NutrientsCoders.main_project.eachmeal.mapper;

import NutrientsCoders.main_project.eachmeal.dto.EachMealDto;
import NutrientsCoders.main_project.eachmeal.dto.EachMealResponseDto;
import NutrientsCoders.main_project.eachmeal.dto.EachMealResponseSimpleDto;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.food.entity.Food;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface EachMealMapper {
  //EachMealPostDto-> EachMeal
  default EachMeal eachMealDtoToEachMeal(EachMealDto eachMealDto){
    EachMeal eachMeal = new EachMeal();
    eachMeal.setEachMealFoods(eachMealFoodDtosToEachMealFoods(eachMealDto.getFoods()));
    eachMeal.setFavorite(eachMealDto.getFavorite());
    eachMeal.setTimeSlot(eachMealDto.getTimeSlots());
    
    return eachMeal;
  }
  //EachMeal-> ResponseDto
  default EachMealResponseDto eachMealToEachMealResponseDto(EachMeal eachMeal) {
    EachMealResponseDto eachMealResponseDto = EachMealResponseDto.builder()
        .memberId(eachMeal.getMember().getMemberId())
        .eachMealId(eachMeal.getEachMealId())
        .timeSlots(eachMeal.getTimeSlot())
        .favorite(eachMeal.getFavorite())
        .totalEachKcal(eachMeal.getTotalEachKcal())
        .totalEachCarbo(eachMeal.getTotalEachCarbo())
        .totalEachProtein(eachMeal.getTotalEachProtein())
        .totalEachFat(eachMeal.getTotalEachFat())
        .build();
    
    List<EachMealResponseDto.QuantityFoodDto> quantityFoods = new ArrayList<>();
    
    // EachMealFood를 QuantityFoodDto로 변환하여 리스트에 추가
    for (EachMealFood eachMealFood : eachMeal.getEachMealFoods()) {
      EachMealResponseDto.QuantityFoodDto quantityFoodDto = EachMealResponseDto.QuantityFoodDto.builder()
          .foodId(eachMealFood.getFood().getFoodId())
          .brand(eachMealFood.getFood().getBrand())
          .foodName(eachMealFood.getFood().getFoodName())
          .foodCategory1(eachMealFood.getFood().getFoodCategory1())
          .foodCategory2(eachMealFood.getFood().getFoodCategory2())
          .servingSize(eachMealFood.getFood().getServingSize())
          .quantity(eachMealFood.getQuantity())
          .ratioEachKcal(eachMealFood.getRateKcal())
          .ratioEachCarbo(eachMealFood.getRateCarbo())
          .ratioEachProtein(eachMealFood.getRateProtein())
          .ratioEachFat(eachMealFood.getRateFat())
          .build();
      quantityFoods.add(quantityFoodDto);
    }
    eachMealResponseDto.setQuantityfoods(quantityFoods);
    
    return eachMealResponseDto;
  }
  
  //EachMealFoodDtos -> EachMealFoods
  default List<EachMealFood> eachMealFoodDtosToEachMealFoods(List<EachMealDto.EachMealFoodDto> eachMealFoodDtos) {
    return eachMealFoodDtos.stream()
        .map(eachMealFoodDto -> {
          EachMealFood eachMealFood = new EachMealFood();
          Food food = new Food();
          food.setFoodId(eachMealFoodDto.getFoodId());
          eachMealFood.setFood(food);
          eachMealFood.setQuantity(eachMealFoodDto.getQuantity());
          return eachMealFood;
        })
        .collect(Collectors.toList());
  }
  
  List<EachMealResponseSimpleDto> eachMealToEachMealResponseSimpleDto(List<EachMeal> eachMeal);
}
