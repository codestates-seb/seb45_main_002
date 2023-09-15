package NutrientsCoders.main_project.dailymeal.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
public class DailyMealDto {
  @NotNull
  private LocalDate date;
  
  @NotNull
  private String name;
  
  private Boolean favorite;
  
  @NotNull
  private List<Long> eachMeals;
}
