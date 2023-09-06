package NutrientsCoders.main_project.eachmeal.repository;


import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EachMealFoodRepository extends JpaRepository<EachMealFood, Long> {
  
  void deleteEachMealFoodsByEachMeal_EachMealId(long eachMealId);
}
