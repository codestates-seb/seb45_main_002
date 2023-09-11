package NutrientsCoders.main_project.dailymeal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
public class DailyMealResponseDto {
  private Long dailyMealId;
  private Long memberId;
  private LocalDate date;
  private String name;
  private Boolean favorite;
  private List<EachMealDto> eachMeals;
  private Double totalDailyKcal;
  private Double totalDailyCarbo;
  private Double totalDailyProtein;
  private Double totalDailyFat;
  
  @Builder
  @Getter
  @Setter
  public static class EachMealDto {
    private long eachMealId;
    private Integer timeSlots;
    private Boolean favorite;
    private List<QuantityFoodDto> quantityfoods;
    private Double totalEachKcal;
    private Double totalEachCarbo;
    private Double totalEachProtein;
    private Double totalEachFat;
    
    @Builder
    @Getter
    @Setter
    public static class QuantityFoodDto {
      private Long foodId;
      private String brand;
      private String foodName;
      private String foodCategory1;
      private String foodCategory2;
      private Long servingSize;
      private Double quantity;
      private Double ratioEachKcal;
      private Double ratioEachCarbo;
      private Double ratioEachProtein;
      private Double ratioEachFat;
    }
  }
}