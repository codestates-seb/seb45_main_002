package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
