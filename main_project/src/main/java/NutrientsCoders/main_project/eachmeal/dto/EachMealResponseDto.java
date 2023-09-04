package NutrientsCoders.main_project.eachmeal.dto;

import NutrientsCoders.main_project.food.entity.Food;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class EachMealResponseDto {
  private long memberId;
  
  private long eachMealId;
  
  private Long timeSlots;
  
  private List<QuantityFoodDto> quantityfoods;
  
  private Long totalEachKcal;
  
  private Double totalEachCarbo;
  
  private Double totalEachProtein;
  
  private Double totalEachFat;
  
  @Getter
  @Setter
  public static class QuantityFoodDto {
    private Food food; //Dto로?
    private Double quantity;
    private Long ratioEachKcal;
    private Double ratioEachCarbo;
    private Double ratioEachProtein;
    private Double ratioEachFat;
      }
}
