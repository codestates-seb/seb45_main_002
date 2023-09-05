package NutrientsCoders.main_project.eachmeal.entity;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.food.entity.Food;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class EachMeal {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "EACHMEAL_ID")
  private Long eachMealId;

//  @ManyToOne
//  @JoinColumn(name = "MEMBER_ID")
//  private Member member ;

  @Column
  @OneToMany(mappedBy = "eachMealFoodId", cascade = CascadeType.PERSIST)
  private List<EachMealFood> eachMealFoods;

  @ManyToOne
  @JoinColumn(name = "DAILYMEAL_ID")
  private DailyMeal dailyMeal;

  public enum timeSlots {
    Breakfast(1, "아침 식사"),
    Lunch(2, "점심 식사"),
    Dinner(3, "저녁 식사");

    @Getter
    private int num;

    @Getter
    private String mealType;

    timeSlots(int num, String mealType) {
    }
  }

  }
