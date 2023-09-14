package NutrientsCoders.main_project.dailymeal.entity;

import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class DailyMeal {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "DAILYMEAL_ID")
  private Long dailyMealId;

  @ManyToOne
  @JoinColumn(name = "MEMBER_ID")
  private Member member;
  
  @OneToOne(mappedBy = "dailyMeal", cascade = CascadeType.REMOVE)
  private Analysis analysis;
  
  @Column
  private LocalDate date;

  @Column(nullable = false)
  private String name;

  @Column
  private Boolean favorite = false;

  @OneToMany(mappedBy = "dailyMeal", cascade = CascadeType.ALL)
  private List<EachMeal> eachMeals;
  
  @Column
  private Double totalDailyKcal;
  
  @Column
  private Double totalDailyCarbo;
  
  @Column
  private Double totalDailyProtein;
  
  @Column
  private Double totalDailyFat;
  
  private Double totalPercentCarbos;
  private Double totalPercentProteins;
  private Double totalPercentFats;
  
  public void calculateTotal() {
    if (eachMeals != null && !eachMeals.isEmpty()) {
      totalDailyKcal = Math.round(eachMeals.stream().mapToDouble(EachMeal::getTotalEachKcal)
          .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      totalDailyCarbo = Math.round(eachMeals.stream().mapToDouble(EachMeal::getTotalEachCarbo)
          .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      totalDailyProtein = Math.round(eachMeals.stream().mapToDouble(EachMeal::getTotalEachProtein)
          .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      totalDailyFat = Math.round(eachMeals.stream().mapToDouble(EachMeal::getTotalEachFat)
          .sum() * Math.pow(10, 2)) / Math.pow(10, 2);
      
      // 총 섭취 그램 수 계산
      Double totalGrams = totalDailyCarbo + totalDailyProtein + totalDailyFat;
      
      // 섭취 탄단지 비율 계산
      totalPercentCarbos = Math.round((totalDailyCarbo / totalGrams)  * 100) / 100.0;
      totalPercentProteins = Math.round((totalDailyProtein / totalGrams)  * 100) / 100.0;
      totalPercentFats = Math.round((1.0 - totalDailyCarbo - totalDailyProtein) * 100) / 100.0;
    } else {
      totalDailyKcal = 0.0;
      totalDailyCarbo = 0.0;
      totalDailyProtein = 0.0;
      totalDailyFat = 0.0;
      
      totalPercentCarbos = 0.0;
      totalPercentProteins = 0.0;
      totalPercentFats = 0.0;
      
    }
  }
}
