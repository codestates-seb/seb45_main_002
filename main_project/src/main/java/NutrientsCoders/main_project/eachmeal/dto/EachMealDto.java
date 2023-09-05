package NutrientsCoders.main_project.eachmeal.dto;

import lombok.Getter;

import java.util.List;
@Getter
public class EachMealDto {
  private long memberId;
  
  private long dailymealId;
  
  private Integer timeSlots;
  
  private List<EachMealFoodDto> foods;
  
  private Double totalEachKcal;
  
  private Double totalEachCarbo;
  
  private Double totalEachProtein;
  
  private Double totalEachFat;
  @Getter
  public static class EachMealFoodDto {
    private long eachMealFoodId;
    
    private long foodId;
    
    private Double quantity;
    
    public EachMealFoodDto(long eachMealFoodId, long foodId, Double quantity) {
      this.eachMealFoodId = eachMealFoodId;
      this.foodId = foodId;
      this.quantity = quantity;
    }
  }
}
