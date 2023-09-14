package NutrientsCoders.main_project.Analysis.service;

import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.Analysis.repository.AnalysisRepository;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class AnalysisService {
  private final AnalysisRepository analysisRepository;
  
  public AnalysisService(AnalysisRepository analysisRepository) {
    this.analysisRepository = analysisRepository;
  }
  
  @Transactional
  public Analysis createAnalysis(DailyMeal dailyMeal, Double needKacl) {
    
    if (dailyMeal.getEachMeals().isEmpty()) {throw new LogicException(ExceptionCode.DAILYMEAL_EMPTY);}

    Analysis analysis = analyzeMeal(dailyMeal, needKacl);
    Optional<Analysis> findAnalysis = analysisRepository.findByDailyMeal(dailyMeal);
    findAnalysis.ifPresent(analysisRepository::delete);
    analysis.setResult(checkResult(analysis));
    
    return analysisRepository.save(analysis);
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
  
  public String checkResult(Analysis analysis){
    Double overCarbos = analysis.getOverPercentCarbos();  // 변수 이름 수정
    Double overProteins = analysis.getOverPercentProteins();
    Double overFats = analysis.getOverPercentFats();  // 변수 이름 수정
    
    Double overSum = overCarbos + overProteins + overFats;
    
    if (overSum < 1.5) return "양호";
    else if (overSum < 3.0) return "보통";
    else return "불량";
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
