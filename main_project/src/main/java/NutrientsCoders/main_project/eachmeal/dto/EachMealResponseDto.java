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
  
  private List<quantityFoodDto> quantityfoods;
  
  private Double totalEachKcal;
  
  private Double totalEachCarbo;
  
  private Double totalEachProtein;
  
  private Double totalEachFat;
  
  @Getter
  @AllArgsConstructor
  public static class quantityFoodDto {
    private Food food;
    private Double quantity;
    private Double ratioEachKcal;
    private Double ratioEachCarbo;
    private Double ratioEachProtein;
    private Double ratioEachFat;
      }
}
