package NutrientsCoders.main_project.food.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Food {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "FOOD_ID", unique = true)
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
  
  @OneToOne(fetch = FetchType.LAZY, mappedBy = "food", cascade = CascadeType.PERSIST)
  private EtcNutrients etcNutrients;

  @Column
  private Boolean morning;
}
