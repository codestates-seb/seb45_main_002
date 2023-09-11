package NutrientsCoders.main_project.Analysis.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class AnalysisResponseDto {
  private long analysisId;
  
  private Double idealKacl;
  private Double overKcal;
  
  private Double totalGrams;
  
  private long percentCarbos;
  private long percentProteins;
  private long percentFats;
  
  private Double idealCarbohydrates;
  private Double idealProteins;
  private Double idealFats;
  
  private Double overCarbohydrates;
  private Double overProteins;
  private Double overFats;
  
  private Double overPercentCarbos;
  private Double overPercentProteins;
  private Double overPercentFats;
  
  private DailyMealSimpleResponseDto dailyMeal;
  @Getter
  @Setter
  public static class DailyMealSimpleResponseDto {
    private Long dailyMealId;
    private LocalDate date;
    private String name;
    private Boolean favorite;
    private Double totalDailyKcal;
    private Double totalDailyCarbo;
    private Double totalDailyProtein;
    private Double totalDailyFat;
  }
}
