package NutrientsCoders.main_project.dailymeal.repository;


import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyMealRepository extends JpaRepository<DailyMeal, Long> {
  
  @Query("SELECT dm FROM DailyMeal dm WHERE dm.date = :date and dm.member.memberId = :memberId")
  Optional<DailyMeal> findDailyMealByDate(@Param("date") LocalDate date, @Param("memberId") long memberId);
  
  @Query("SELECT dm FROM DailyMeal dm WHERE dm.member.memberId = :memberId")
  List<DailyMeal> findAllByMemeberId(@Param("memberId") long memberId);


//  @Query("SELECT dm FROM DailyMeal dm WHERE dm.member.memberId = :memberId")
//  List<DailyMeal> findDailyMealsByMemberId(Long memberId);


}
