package NutrientsCoders.main_project.dailymeal.repository;


import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

@Mapper(componentModel = "spring")
public interface DailyMealRepository extends JpaRepository<DailyMeal, Long> {
}
