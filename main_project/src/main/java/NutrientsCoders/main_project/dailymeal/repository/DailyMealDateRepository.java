package NutrientsCoders.main_project.dailymeal.repository;


import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyMealDateRepository extends JpaRepository<DailyMeal, Long> {
  
  //date, memberId 일치, 선호 제외(날짜 조회)
  @Query("SELECT dm FROM DailyMeal dm LEFT JOIN FETCH dm.eachMeals e WHERE dm.date = :date and dm.member.memberId = :memberId AND dm.favorite = false")
  Optional<DailyMeal> findDailyMealByDate(@Param("date") LocalDate date, @Param("memberId") long memberId);
  
  //memberId 전체, 선호제외, date 정렬
  @Query("SELECT dm FROM DailyMeal dm WHERE dm.member.memberId = :memberId AND dm.favorite = false ORDER BY dm.date")
  Page<DailyMeal> findAllDateByMemberId(@Param("memberId") long memberId, Pageable pageable);
}
