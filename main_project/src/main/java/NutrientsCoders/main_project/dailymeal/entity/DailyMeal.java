package NutrientsCoders.main_project.dailymeal.entity;

import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
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

  @Column(nullable = false)
  private String name;

//  @Column
//  @ManyToOne
//  @JoinColumn(name = "MEMBER_ID")
//  private Member member;

  @Column
  private Boolean favorite = false;

  @Column
  private Timestamp createAt;

  @OneToMany(mappedBy = "dailyMeal", cascade = CascadeType.REMOVE)
  private List<EachMeal> eachMealList;
  
}
