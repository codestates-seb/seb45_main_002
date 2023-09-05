package NutrientsCoders.main_project.food.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@TableGenerator(name = "generator", initialValue = 10000)
@Getter
@Setter
@Entity
public class Food {
  
  @Id
  @GeneratedValue(strategy = GenerationType.TABLE, generator = "generator")
  @Column(name = "FOOD_ID")
  private Long foodId;

  @Column(nullable = false, updatable = false)
  private String brand;

  @Column(nullable = false, updatable = false)
  private String foodName;

  @Column(nullable = false, updatable = false)
  private String foodCategory1;

  @Column(nullable = false, updatable = false)
  private String foodCategory2;

  @Column(nullable = false, updatable = false)
  private Long servingSize;

  @Column(nullable = false, updatable = false)
  private Long kcal;

  @Column(nullable = false, updatable = false)
  private Double carbo;

  @Column(nullable = false, updatable = false)
  private Double protein;

  @Column(nullable = false, updatable = false)
  private Double fat;
  
  @OneToOne(fetch = FetchType.LAZY, mappedBy = "food", cascade = CascadeType.ALL)
  private EtcNutrients etcNutrients;

  @Column
  private Boolean breakfast;
}
