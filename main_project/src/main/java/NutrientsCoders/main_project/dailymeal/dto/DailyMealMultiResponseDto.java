package NutrientsCoders.main_project.dailymeal.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DailyMealMultiResponseDto {
  private Long dailyMealId;
  private LocalDate date;
  private String name;
  private Boolean favorite;
  private Double totalDailyKcal;
  private Double totalDailyCarbo;
  private Double totalDailyProtein;
  private Double totalDailyFat;
}