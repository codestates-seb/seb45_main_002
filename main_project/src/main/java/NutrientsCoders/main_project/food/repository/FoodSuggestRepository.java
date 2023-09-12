package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FoodSuggestRepository extends JpaRepository<Food, Long> {
  
  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category" +
      " ORDER BY " +
      " CASE WHEN :orderbyDsce = '-protein' THEN f.protein END DESC," +
      " CASE WHEN :orderbyDsce = '-fat' THEN f.fat END DESC," +
      " CASE WHEN :orderbyDsce = '-carbo' THEN f.carbo END DESC," +
      " CASE WHEN :orderbyDsce = '+protein' THEN f.protein END ASC," +
      " CASE WHEN :orderbyDsce = '+fat' THEN f.fat END ASC," +
      " CASE WHEN :orderbyDsce = '+carbo' THEN f.carbo END ASC")
  Page<Food> findInCategoryBreakfast(@Param("category") String category, @Param("orderbyDsce") String orderbyDsce, Pageable pageable);


  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category" +
      " ORDER BY " +
      " CASE WHEN :orderbyDsce = '-protein' THEN f.protein END DESC," +
      " CASE WHEN :orderbyDsce = '-fat' THEN f.fat END DESC," +
      " CASE WHEN :orderbyDsce = '-carbo' THEN f.carbo END DESC," +
      " CASE WHEN :orderbyDsce = '+protein' THEN f.protein END ASC," +
      " CASE WHEN :orderbyDsce = '+fat' THEN f.fat END ASC," +
      " CASE WHEN :orderbyDsce = '+carbo' THEN f.carbo END ASC")
  Page<Food> findInCategoryOther(@Param("category") String category, @Param("orderbyDsce") String orderbyDsce, Pageable pageable);
}

