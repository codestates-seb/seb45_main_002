package NutrientsCoders.main_project.dailymeal.mapper;

import NutrientsCoders.main_project.dailymeal.dto.DailyMealPostDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealPatchDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealSimpleResponseDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface DailyMealMapper {
  default DailyMeal dailyMealDtoToDailyMeal(DailyMealPostDto dailyMealPostDto){
    DailyMeal dailyMeal = new DailyMeal();
    dailyMeal.setDate(dailyMealPostDto.getDate());
    dailyMeal.setName(dailyMealPostDto.getName());
    dailyMeal.setFavorite(dailyMealPostDto.getFavorite());
    return dailyMeal;
  }
  
  default DailyMeal dailyMealPatchDtoToDailyMeal(DailyMealPatchDto dailyMealPatchDto){
    DailyMeal dailyMeal = new DailyMeal();
    dailyMeal.setName(dailyMealPatchDto.getName());
    dailyMeal.setFavorite(dailyMealPatchDto.getFavorite());
    return dailyMeal;
  }
  default DailyMealResponseDto dailyMealToDailyMealResponseDto(DailyMeal savedDailyMeal) {
    DailyMealResponseDto dailyMealResponseDto = DailyMealResponseDto.builder()
    .dailyMealId(savedDailyMeal.getDailyMealId())
    .memberId(savedDailyMeal.getMember().getMemberId())
    .date(savedDailyMeal.getDate())
    .name(savedDailyMeal.getName())
    .favorite(savedDailyMeal.getFavorite())
    .totalDailyKcal(savedDailyMeal.getTotalDailyKcal())
    .totalDailyCarbo(savedDailyMeal.getTotalDailyCarbo())
    .totalDailyProtein(savedDailyMeal.getTotalDailyProtein())
    .totalDailyFat(savedDailyMeal.getTotalDailyFat())
    .build();
    //식단 set
    
    List<EachMeal> eachMeals = savedDailyMeal.getEachMeals();
    List<DailyMealResponseDto.EachMealDto> eachMealDtos = new ArrayList<>();
    
    for (EachMeal eachMeal : eachMeals) {
      DailyMealResponseDto.EachMealDto eachMealDto = DailyMealResponseDto.EachMealDto.builder()
          .eachMealId(eachMeal.getEachMealId())
          .timeSlots(eachMeal.getTimeSlot())
          .favorite(eachMeal.getFavorite())
          .totalEachKcal(eachMeal.getTotalEachKcal())
          .totalEachCarbo(eachMeal.getTotalEachCarbo())
          .totalEachProtein(eachMeal.getTotalEachProtein())
          .totalEachFat(eachMeal.getTotalEachFat())
          .build();
      //끼니 set
      List<DailyMealResponseDto.EachMealDto.QuantityFoodDto> quantityFoods = eachMeal.getEachMealFoods().stream()
          .map(eachMealFood -> DailyMealResponseDto.EachMealDto.QuantityFoodDto.builder()
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
              .build())
          .collect(Collectors.toList());
      //비율 음식 set
      eachMealDto.setQuantityfoods(quantityFoods);
      eachMealDtos.add(eachMealDto);
    }
    
    dailyMealResponseDto.setEachMeals(eachMealDtos);
    return dailyMealResponseDto;
  }
  
  List<DailyMealSimpleResponseDto> dailyMealsToDailyMealResponseDtos(List<DailyMeal> dailyMeal);
}
  


