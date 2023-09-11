package NutrientsCoders.main_project.Analysis.repository;


import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
  Optional<Analysis> findByDailyMeal(DailyMeal dailyMealId);
}
    
