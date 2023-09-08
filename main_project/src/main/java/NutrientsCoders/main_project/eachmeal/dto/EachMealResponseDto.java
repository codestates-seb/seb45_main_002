package NutrientsCoders.main_project.eachmeal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class EachMealResponseDto {
  private long memberId;
  private long eachMealId;
  private Integer timeSlots;
  private Boolean favorite;
  private Long totalEachKcal;
  private Double totalEachCarbo;
  private Double totalEachProtein;
  private Double totalEachFat;
  private List<QuantityFoodDto> quantityfoods;
  
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
