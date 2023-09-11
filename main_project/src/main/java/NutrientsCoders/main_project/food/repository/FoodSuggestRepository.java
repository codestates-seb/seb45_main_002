package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FoodSuggestRepository extends JpaRepository<Food, Long> {
  
  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot" +
      " ORDER BY CASE :orderbyDsce" +
      " WHEN '-protein' THEN f.protein" +
      " WHEN '-fat' THEN f.fat" +
      " WHEN '-carbo' THEN f.carbo END desc ")
  Page<Food> findInCategoryBreackFast(@Param("category") String category, @Param("orderbyDsce") String orderbyDsce,
                                      @Param("timeSlot") String timeSlot, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category" +
      " ORDER BY CASE :orderbyDsce" +
      " WHEN '-protein' THEN f.protein" +
      " WHEN '-fat' THEN f.fat" +
      " WHEN '-carbo' THEN f.carbo END desc ")
  Page<Food> findInCategoryOther(@Param("category") String category, @Param("orderbyDsce") String orderbyDsce, Pageable pageable);
}

