package NutrientsCoders.main_project.Analysis.repository;


import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {
  Optional<Analysis> findByDailyMeal(DailyMeal dailyMealId);
  
  @Query("SELECT an FROM Analysis an WHERE an.dailyMeal.member.memberId = :memberId ORDER BY an.dailyMeal.date DESC")
  Page<Analysis> findAllByMemberId(@Param("memberId") long memberId, Pageable pageable);
}