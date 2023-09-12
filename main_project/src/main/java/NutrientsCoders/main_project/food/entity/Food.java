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
  
  @Column(updatable = false, nullable = false)
  private String section;
  
  @Column(updatable = false, nullable = false)
  private String brand;
  
  @Column(updatable = false)
  private String foodName;
  
  @Column(updatable = false)
  private String foodCategory1;
  
  @Column(updatable = false)
  private String foodCategory2;
  
  @Column(updatable = false, nullable = false)
  private Long servingSize;
  
  @Column(updatable = false, nullable = false)
  private Long kcal;
  
  @Column(updatable = false)
  private Double carbo;
  
  @Column(updatable = false)
  private Double protein;
  
  @Column(updatable = false)
  private Double fat;
  
  @Column(updatable = false)
  private Double carboRate;
  
  @Column(updatable = false)
  private Double proteinRate;
  
  @Column(updatable = false)
  private Double fatRate;
  
  @OneToOne(fetch = FetchType.LAZY, mappedBy = "food", cascade = CascadeType.ALL)
  private EtcNutrients etcNutrients;

  @Column
  private String breakfast;
}
