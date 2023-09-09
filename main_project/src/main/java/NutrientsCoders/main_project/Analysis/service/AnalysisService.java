package NutrientsCoders.main_project.Analysis.service;

import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.Analysis.repository.AnalysisRepository;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AnalysisService {
  private final AnalysisRepository analysisRepository;
  
  public AnalysisService(AnalysisRepository analysisRepository) {
    this.analysisRepository = analysisRepository;
  }
  
  @Transactional
  public Analysis createAnalysis(DailyMeal dailyMeal, Double needKacl) {
    return analysisRepository.save(analyzeMeal(dailyMeal, needKacl));
  }
  @Transactional
  public Analysis findByAnalysis(long analysisId) {
    return verifyExistsEachMeal(analysisId);
  }
  
  @Transactional
  public void deleteAnalysis(long analysisId) {
    analysisRepository.delete(verifyExistsEachMeal(analysisId));
  }
  
  
  public Analysis verifyExistsEachMeal(long analysisId){
    return analysisRepository.findById(analysisId)
        .orElseThrow(() -> new LogicException(ExceptionCode.ANALYSIS_NOT_FOUND));
  }
  
  //식단 분석 메서드
  private Analysis analyzeMeal(DailyMeal dailyMeal, Double needKacl)  {
    Double Kacls = dailyMeal.getTotalDailyKcal();
    Double carbohydrates = dailyMeal.getTotalDailyCarbo();
    Double proteins = dailyMeal.getTotalDailyProtein();
    Double fats = dailyMeal.getTotalDailyFat();
    
    Analysis analysis = new Analysis();
    analysis.setDailyMeal(dailyMeal);
    analysis.setIdealKacl(needKacl);
    analysis.calculator(Kacls, carbohydrates, proteins, fats);
    return analysis;
  }
}
