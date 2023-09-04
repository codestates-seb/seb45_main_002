package NutrientsCoders.main_project.eachmeal.entity;

import NutrientsCoders.main_project.food.entity.Food;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class EachMealFood {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "EATCHMEALFOOD_ID")
  private Long eachMealFoodId;

  @ManyToOne    //단방향
  @JoinColumn(name = "FOOD_ID")
  private Food food;

  @ManyToOne
  @JoinColumn(name = "EATCHMEAL_ID")
  private EachMeal eachMeal;

  private Double quantity;
}
