package NutrientsCoders.main_project.food.repository;


import NutrientsCoders.main_project.food.entity.EtcNutrients;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EtcNutrientsRepository extends JpaRepository<EtcNutrients, Long> {
  Optional<EtcNutrients> findByEtcNutrientsId(Long foodId);
}
