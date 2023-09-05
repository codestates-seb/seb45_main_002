package NutrientsCoders.main_project.eachmeal.dto;

import NutrientsCoders.main_project.food.entity.EtcNutrients;
import NutrientsCoders.main_project.food.entity.Food;
import lombok.AllArgsConstructor;
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
  
  private List<QuantityFoodDto> quantityfoods;
  
  private Long totalEachKcal;
  
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
    
    private Long ratioEachKcal;
    private Double ratioEachCarbo;
    private Double ratioEachProtein;
    private Double ratioEachFat;
    }
}
