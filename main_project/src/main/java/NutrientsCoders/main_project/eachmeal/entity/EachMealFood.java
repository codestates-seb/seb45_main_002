package NutrientsCoders.main_project.eachmeal.entity;

import NutrientsCoders.main_project.food.entity.Food;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
  
  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "EATCHMEAL_ID")
  private EachMeal eachMeal;
  
  @Column
  private Double quantity;
  
  @Column
  private Double rateKcal;
  
  @Column
  private Double rateCarbo;
  
  @Column
  private Double rateProtein;
  
  @Column
  private Double rateFat;
  
  public EachMealFood(Food food, Double quantity) {
    this.food = food;
    this.quantity = quantity;
  }
  public void calculateRate() {
    if (food != null && quantity !=null) {
      rateKcal = Math.round(food.getKcal()*quantity)* Math.pow(10, 2) / Math.pow(10, 2);
      rateCarbo = Math.round(food.getCarbo()*quantity)* Math.pow(10, 2) / Math.pow(10, 2);
      rateProtein = Math.round(food.getProtein()*quantity)* Math.pow(10, 2) / Math.pow(10, 2);
      rateFat = Math.round(food.getFat()*quantity)* Math.pow(10, 2) / Math.pow(10, 2);
    } else {
      rateKcal = 0.0;
      rateCarbo = 0.0;
      rateProtein = 0.0;
      rateFat = 0.0;
    }
  }
}
