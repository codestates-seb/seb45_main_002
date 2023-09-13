package NutrientsCoders.main_project.food.dto;

import lombok.Getter;

@Getter
public class FoodPatchDto {
  private String foodName;
  
  private Long servingSize;
  
  private Double kcal;
  
  private Double carbo;
  
  private Double protein;
  
  private Double fat;
}
