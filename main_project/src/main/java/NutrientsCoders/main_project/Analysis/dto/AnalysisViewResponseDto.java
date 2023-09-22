package NutrientsCoders.main_project.Analysis.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Builder
@Setter
@Getter
public class AnalysisViewResponseDto {
  private long analysisId;
  private DailyMealSimpleResponseDto dailyMeal;
  
  private Integer height;
  private Integer weight;
  
  private Double idealKcal;
  private Double overKcal;
  
  private percentMacro percentMacro;
  private overPercentMacro overPercentMacro;
  
  private String result;
  
  @Getter
  @Setter
  @Builder
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
  @Getter
  @Setter
  @Builder
  public static class percentMacro {
    private Double percentCarbos;
    private Double percentProteins;
    private Double percentFats;
  }
  @Getter
  @Setter
  @Builder
  public static class overPercentMacro {
    private Double overPercentCarbos;
    private Double overPercentProteins;
    private Double overPercentFats;
  }
}
