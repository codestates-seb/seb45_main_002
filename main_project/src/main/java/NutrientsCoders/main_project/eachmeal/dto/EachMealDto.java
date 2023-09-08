package NutrientsCoders.main_project.eachmeal.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
@Getter
public class EachMealDto {
  private long memberId;
  private long dailymealId;
  private Integer timeSlots;
  private Boolean favorite;
  private List<EachMealFoodDto> foods;

  @Getter
  @NoArgsConstructor(access = AccessLevel.PROTECTED)
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
