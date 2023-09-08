package NutrientsCoders.main_project.Analysis.repository;


import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Food, Long> {
  @Query("SELECT f FROM Food f WHERE f.foodName LIKE %:searchWord%")
  Page<Food> findBySearchWordFood(@Param("searchWord") String searchWord, Pageable pageable);
  
  //id로 food 조회
  @Query("SELECT f FROM Food f WHERE f.foodId = :foodId")
  Optional<Food> findByFoodId(@Param("foodId") long foodId);

}
    
