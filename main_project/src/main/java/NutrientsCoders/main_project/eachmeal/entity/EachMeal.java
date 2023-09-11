package NutrientsCoders.main_project.eachmeal.entity;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.member.entity.Member;
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

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;

  @Column
  @OneToMany(mappedBy = "eachMeal", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<EachMealFood> eachMealFoods;

  @ManyToOne
  @JoinColumn(name = "DAILYMEAL_ID")
  private DailyMeal dailyMeal;
  
  @Column
  private Boolean favorite = false;
  
  @Column
  private Double totalEachKcal;
  
  @Column
  private Double totalEachCarbo;
  
  @Column
  private Double totalEachProtein;
  
  @Column
  private Double totalEachFat;
  
  @Column
  private Integer timeSlot;
  
  private Double totalPercentCarbo;
  private Double totalPercentProtein;
  private Double totalPercentFat;

  public void calculateTotal() {
    if (eachMealFoods != null && !eachMealFoods.isEmpty()) {
      totalEachKcal = Math.round(eachMealFoods.stream().mapToDouble(EachMealFood::getRateKcal)
                            .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      totalEachCarbo = Math.round(eachMealFoods.stream().mapToDouble(EachMealFood::getRateCarbo)
                            .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      totalEachProtein = Math.round(eachMealFoods.stream().mapToDouble(EachMealFood::getRateProtein)
                            .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      totalEachFat = Math.round(eachMealFoods.stream().mapToDouble(EachMealFood::getRateFat)
                            .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      
      Double totalMacros = totalEachCarbo + totalEachProtein + totalEachFat;
      totalPercentCarbo =  Math.round((totalEachCarbo / totalMacros) * Math.pow(10, 2)) / Math.pow(10, 2);
      totalPercentProtein =  Math.round((totalEachProtein / totalMacros) * Math.pow(10, 2)) / Math.pow(10, 2);
      totalPercentFat =  Math.round((1.0 - totalPercentCarbo - totalPercentProtein) * Math.pow(10, 2)) / Math.pow(10, 2);
      
      
    } else {
      totalEachKcal = 0.0;
      totalEachCarbo = 0.0;
      totalEachProtein = 0.0;
      totalEachFat = 0.0;
    }
  }
  }
