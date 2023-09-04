package NutrientsCoders.main_project.dailymeal.dto;

import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class DailyMealResponseDto {
  private Long dailyMealId;
  
  private Long memberId;
  
  private LocalDate date;
  
  private String name;
  
  private Boolean favorite;
  
  private List<EachMeal> eachMeals;
  
  private Double totalDailyKcal;
  
  private Double totalDailyCarbo;
  
  private Double totalDailyProtein;
  
  private Double totalDailyFat;
}
