package NutrientsCoders.main_project.food.dto;

import lombok.Getter;

@Getter
public class FoodPostDto {
  private String foodName;
  
  private Long servingSize;
  
  private Long kcal;
  
  private Double carbo;
  
  private Double protein;
  
  private Double fat;
}
