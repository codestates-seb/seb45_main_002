package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
  @Query("SELECT f FROM Food f WHERE f.foodName LIKE %:searchWord%")
  Page<Food> findBySearchWordFood(@Param("searchWord") String searchWord, Pageable pageable);
  @Query(value = "SELECT f FROM Food f " +
            "ORDER BY CASE " +
            "WHEN :nutrientType = 'carbo' THEN f.carbo " +
            "WHEN :nutrientType = 'protein' THEN f.protein " +
            "WHEN :nutrientType = 'fat' THEN f.fat " +
            "WHEN :nutrientType = 'sugar' THEN f.etcNutrients.sugar " +
            "WHEN :nutrientType = 'natrium' THEN f.etcNutrients.natrium " +
            "WHEN :nutrientType = 'vitaminA' THEN f.etcNutrients.vitaminA " +
            "WHEN :nutrientType = 'vitaminE' THEN f.etcNutrients.vitaminE " +
            "WHEN :nutrientType = 'vitaminB1' THEN f.etcNutrients.vitaminB1 " +
            "WHEN :nutrientType = 'vitaminB2' THEN f.etcNutrients.vitaminB2 " +
            "WHEN :nutrientType = 'vitaminB3' THEN f.etcNutrients.vitaminB3 " +
            "WHEN :nutrientType = 'vitaminB6' THEN f.etcNutrients.vitaminB6 " +
            "WHEN :nutrientType = 'vitaminB12' THEN f.etcNutrients.vitaminB12 " +
            "WHEN :nutrientType = 'vitaminC' THEN f.etcNutrients.vitaminC " +
            "WHEN :nutrientType = 'vitaminD' THEN f.etcNutrients.vitaminD " +
            "WHEN :nutrientType = 'folicAcid' THEN f.etcNutrients.folicAcid " +
            "WHEN :nutrientType = 'calcium' THEN f.etcNutrients.calcium " +
            "WHEN :nutrientType = 'iron' THEN f.etcNutrients.iron " +
            "WHEN :nutrientType = 'potassium' THEN f.etcNutrients.potassium " +
            "WHEN :nutrientType = 'saturatiedFat' THEN f.etcNutrients.SaturatedFat " +
      
            "ELSE 0 END DESC",
            countQuery = "SELECT COUNT(f) FROM Food f")
    Page<Food> findTop5ByHighestNutrient(@Param("nutrientType") String nutrientType, Pageable pageable);

  //id로 food 조회
  @Query("SELECT f FROM Food f WHERE f.foodId = :foodId")
  Optional<Food> findByFoodId(@Param("foodId") long foodId);

}
    
