package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FoodSuggestRepository extends JpaRepository<Food, Long> {


  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot ORDER BY f.protein DESC")
  Page<Food> findInCategoryAndBreakfastOrderByProteinDesc(@Param("category") String category,@Param("timeSlot") String timeSlot, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot ORDER BY f.fat DESC")
  Page<Food> findInCategoryAndBreakfastOrderByFatDesc(@Param("category") String category,@Param("timeSlot") String timeSlot, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot ORDER BY f.carbo DESC")
  Page<Food> findInCategoryAndBreakfastOrderByCarboDesc(@Param("category") String category,@Param("timeSlot") String timeSlot, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot ORDER BY f.protein ASC")
  Page<Food> findInCategoryAndBreakfastOrderByProteinAsc(@Param("category") String category,@Param("timeSlot") String timeSlot, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot ORDER BY f.fat ASC")
  Page<Food> findInCategoryAndBreakfastOrderByFatAsc(@Param("category") String category,@Param("timeSlot") String timeSlot, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category AND f.breakfast = :timeSlot ORDER BY f.carbo ASC")
  Page<Food> findInCategoryAndBreakfastOrderByCarboAsc(@Param("category") String category,@Param("timeSlot") String timeSlot, Pageable pageable);


  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category ORDER BY f.protein DESC")
  Page<Food> findInCategoryOrderByProteinDesc(@Param("category") String category, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category ORDER BY f.fat DESC")
  Page<Food> findInCategoryOrderByFatDesc(@Param("category") String category, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category ORDER BY f.carbo DESC")
  Page<Food> findInCategoryOrderByCarboDesc(@Param("category") String category, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category ORDER BY f.protein ASC")
  Page<Food> findInCategoryOrderByProteinAsc(@Param("category") String category, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category ORDER BY f.fat ASC")
  Page<Food> findInCategoryOrderByFatAsc(@Param("category") String category, Pageable pageable);

  @Query("SELECT f FROM Food f WHERE f.foodCategory2 = :category ORDER BY f.carbo ASC")
  Page<Food> findInCategoryOrderByCarboAsc(@Param("category") String category, Pageable pageable);

}

