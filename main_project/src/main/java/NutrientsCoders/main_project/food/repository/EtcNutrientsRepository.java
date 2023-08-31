package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.EtcNutrients;
import NutrientsCoders.main_project.food.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EtcNutrientsRepository extends JpaRepository<EtcNutrients, Long> {
}
