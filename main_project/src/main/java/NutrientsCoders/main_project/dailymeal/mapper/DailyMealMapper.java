package NutrientsCoders.main_project.dailymeal.mapper;

import NutrientsCoders.main_project.dailymeal.dto.DailyMealDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface DailyMealMapper {
  default DailyMeal dailyMealDtoToDailyMeal(DailyMealDto dailyMealDto){
    DailyMeal dailyMeal = new DailyMeal();
//    dailyMeal.setMember(dailyMealDto.getMemberId()); //*******************memberId
    dailyMeal.setDate(dailyMealDto.getDate());
    dailyMeal.setName(dailyMealDto.getName());
    dailyMeal.setFavorite(dailyMealDto.getFavorite());
    return dailyMeal;
  };
  default DailyMealResponseDto dailyMealToDailyMealResponseDto(DailyMeal savedDailyMeal) {
    DailyMealResponseDto dailyMealResponseDto = new DailyMealResponseDto();
    dailyMealResponseDto.setDailyMealId(savedDailyMeal.getDailyMealId());
    dailyMealResponseDto.setMemberId(savedDailyMeal.getMember().getMemberId());
    dailyMealResponseDto.setDate(savedDailyMeal.getDate());
    dailyMealResponseDto.setName(savedDailyMeal.getName());
    dailyMealResponseDto.setFavorite(savedDailyMeal.getFavorite());
    //식단 set
    
    List<EachMeal> eachMeals = savedDailyMeal.getEachMeals();
    List<DailyMealResponseDto.EachMealDto> eachMealDtos = new ArrayList<>();
    
    for (EachMeal eachMeal : eachMeals) {
      DailyMealResponseDto.EachMealDto eachMealDto = DailyMealResponseDto.EachMealDto.builder()
          .eachMealId(eachMeal.getEachMealId())
          .timeSlots(eachMeal.getTimeSlot())
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

  }
  


