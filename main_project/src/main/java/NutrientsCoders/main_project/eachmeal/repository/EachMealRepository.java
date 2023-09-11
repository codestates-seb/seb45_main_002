package NutrientsCoders.main_project.eachmeal.repository;


import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EachMealRepository extends JpaRepository<EachMeal, Long> {
  
  @Query("SELECT e FROM EachMeal e LEFT JOIN e.eachMealFoods en WHERE e.eachMealId = :eachMealId AND e.member.memberId = :memberId")
  Optional<EachMeal> findByEachMealId(@Param("eachMealId") long eachMealId, long memberId);
  
  @Query("SELECT e FROM EachMeal e WHERE e.member.memberId = :memberId")
  Page<EachMeal> findEachMealByMemberId(@Param("memberId") long memberId, Pageable pageable);
}
