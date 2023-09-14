package NutrientsCoders.main_project.dailymeal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Getter
@Setter
public class DailyMealSimpleResponseDto {
  private Long dailyMealId;
  private LocalDate date;
  private String name;
  private Boolean favorite;
  private Double totalDailyKcal;
  private Double totalDailyCarbo;
  private Double totalDailyProtein;
  private Double totalDailyFat;
}