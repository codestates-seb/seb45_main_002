package NutrientsCoders.main_project.eachmeal.mapper;

import NutrientsCoders.main_project.eachmeal.dto.EachMealDto;
import NutrientsCoders.main_project.eachmeal.dto.EachMealResponseDto;
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
    EachMeal eachMeal = new EachMeal(); //dailymealId 추가 사용시 dto로 set말고 파라미터로 넘기기
    eachMeal.setEachMealFoods(eachMealFoodDtosToEachMealFoods(eachMealDto.getFoods()));
    eachMeal.setTotalEachKcal( eachMealDto.getTotalEachKcal().longValue());
    eachMeal.setTotalEachCarbo( eachMealDto.getTotalEachCarbo() );
    eachMeal.setTotalEachProtein( eachMealDto.getTotalEachProtein() );
    eachMeal.setTotalEachFat( eachMealDto.getTotalEachFat() );
    
    return eachMeal;
  }
  //EachMeal-> ResponseDto
  default EachMealResponseDto eachMealToEachMealResponseDto(EachMeal eachMeal) {
    EachMealResponseDto eachMealResponseDto = new EachMealResponseDto();
    eachMealResponseDto.setMemberId(1); // 임시로 memberId 설정*******
    eachMealResponseDto.setEachMealId(eachMeal.getEachMealId());
    eachMealResponseDto.setTotalEachKcal((long) eachMeal.getTotalEachKcal().doubleValue());
    eachMealResponseDto.setTotalEachCarbo(eachMeal.getTotalEachCarbo());
    eachMealResponseDto.setTotalEachProtein(eachMeal.getTotalEachProtein());
    eachMealResponseDto.setTotalEachFat(eachMeal.getTotalEachFat());
    
    List<EachMealResponseDto.QuantityFoodDto> quantityFoods = new ArrayList<>();
    
    // EachMealFood를 QuantityFoodDto로 변환하여 리스트에 추가
    for (EachMealFood eachMealFood : eachMeal.getEachMealFoods()) {
      EachMealResponseDto.QuantityFoodDto quantityFoodDto = new EachMealResponseDto.QuantityFoodDto();
      quantityFoodDto.setFood(eachMealFood.getFood());
      quantityFoodDto.setQuantity(eachMealFood.getQuantity());
      quantityFoodDto.setRatioEachKcal(eachMealFood.getRateKcal());
      quantityFoodDto.setRatioEachCarbo(eachMealFood.getRateCarbo());
      quantityFoodDto.setRatioEachProtein(eachMealFood.getRateProtein());
      quantityFoodDto.setRatioEachFat(eachMealFood.getRateFat());
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
  
}
