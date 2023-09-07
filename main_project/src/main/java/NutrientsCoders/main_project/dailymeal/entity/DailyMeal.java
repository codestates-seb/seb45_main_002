package NutrientsCoders.main_project.dailymeal.entity;

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
  
  @Column(unique = true)
  private LocalDate date;

  @Column(nullable = false)
  private String name;

  @Column
  private Boolean favorite = false;

  @OneToMany(mappedBy = "dailyMeal", cascade = CascadeType.REMOVE)
  private List<EachMeal> eachMeals;
  
  @Column
  private Double totalEachKcal;
  
  @Column
  private Double totalEachCarbo;
  
  @Column
  private Double totalEachProtein;
  
  @Column
  private Double totalEachFat;
  
}
