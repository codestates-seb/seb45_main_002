package NutrientsCoders.main_project.Analysis.entity;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Analysis {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ANALYSIS_ID")
  private long analysisId;
  
  @JoinColumn(name = "DailyMeal_ID")
  @OneToOne
  private DailyMeal dailyMeal;
  
  @Column
  private String result;
  
  @Column
  private Double idealKacl;
  @Column
  private Double overKcal;
  @Column
  private Double totalGrams;
  
  @Column
  private Double percentCarbos;
  @Column
  private Double percentProteins;
  @Column
  private Double percentFats;
  
  @Column
  private Double idealCarbohydrates;
  @Column
  private Double idealProteins;
  @Column
  private Double idealFats;
  
  @Column
  private Double overCarbohydrates;
  @Column
  private Double overProteins;
  @Column
  private Double overFats;
  
  @Column
  private Double overPercentCarbos;
  @Column
  private Double overPercentProteins;
  @Column
  private Double overPercentFats;
  public void calculator(Double kacl, Double carbohydrates, Double proteins, Double fats) {
    // 초과, 부족 칼로리 계산(음수는 부족, 양수는 초과)
    overKcal = kacl- idealKacl;
    
    // 총 섭취 그램 수 계산
    totalGrams = carbohydrates + proteins + fats;
    
    // 섭취 탄단지 비율 계산
    percentCarbos = Math.round((carbohydrates / totalGrams)  * 100) / 100.0;
    percentProteins = Math.round((proteins / totalGrams)  * 100) / 100.0;
    percentFats = Math.round((1.0 - percentCarbos - percentProteins) * 100) / 100.0;

    // 적정 그람수 계산(초과분 계산용)
    idealCarbohydrates = Math.round(totalGrams * (3.0 / 10.0) * 100) / 100.0;
    idealProteins = Math.round(totalGrams * (5.0 / 10.0) * 100) / 100.0;
    idealFats = Math.round(totalGrams * (2.0 / 10.0) * 100) / 100.0;
    // 초과 그람수 계산
    overCarbohydrates = Math.round((carbohydrates - idealCarbohydrates) * 100) / 100.0;
    overProteins = Math.round((proteins - idealProteins) * 100) / 100.0;
    overFats = Math.round((fats - idealFats) * 100) / 100.0;
    // 초과 비율 계산
    overPercentCarbos = Math.round(((carbohydrates - idealCarbohydrates) / idealCarbohydrates)  * 100) / 100.0;
    overPercentProteins = Math.round(((proteins - idealProteins) / idealProteins)  * 100) / 100.0;
    overPercentFats = Math.round(((fats - idealFats) / idealFats) * 100) / 100.0;
  }

}
