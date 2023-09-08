package NutrientsCoders.main_project.eachmeal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class EachMealResponseSimpleDto {
  private long eachMealId;
  private Boolean favorite;
  private Long totalEachKcal;
  private Double totalEachCarbo;
  private Double totalEachProtein;
  private Double totalEachFat;
}
