package NutrientsCoders.main_project.dailymeal.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class DailyMealPatchDto {
  
  @NotNull
  private String name;
  
  private Boolean favorite;
  
  @NotNull
  private List<Long> eachMeals;
}
