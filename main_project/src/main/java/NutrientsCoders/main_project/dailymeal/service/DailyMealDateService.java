package NutrientsCoders.main_project.dailymeal.service;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealDateRepository;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DailyMealDateService {
  private final DailyMealDateRepository dailyMealRepository;
  private final MemberService memberService;
  
  public DailyMealDateService(DailyMealDateRepository dailyMealRepository, MemberService memberService) {
    this.dailyMealRepository = dailyMealRepository;
    this.memberService = memberService;
  }
  
  //선택 식단 조회(날짜)
  public DailyMeal findByDate(long memberId, LocalDate date) {
    return verifyExistsEachMealByDate(memberId, date);
  }
  
  
  //전체 식단 조회(날짜)
  public Page<DailyMeal> findAllByDate(long memberId, Pageable pageable) {
    Page<DailyMeal> dailyMeals = dailyMealRepository.findAllDateByMemberId(memberId, pageable);
    return Optional.of(dailyMeals)
        .filter(list -> !list.isEmpty())
        .orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  
  //식단 수정
  @Transactional
  public DailyMeal updateDateDailyMeal(long memberId, LocalDate date, List<EachMeal> eachMeals) {
    DailyMeal findDailyMeal = verifyExistsEachMealByDate(memberId, date);
    eachMeals.forEach(eachMeal -> eachMeal.setDailyMeal(findDailyMeal));
    findDailyMeal.setEachMeals(eachMeals);
    return dailyMealRepository.save(findDailyMeal);
  }
  
  //식단 삭제
  @Transactional
  public void deleteDateDailyMeal(LocalDate date, long memberId) {
    DailyMeal findDailyMeal = verifyExistsEachMealByDate(memberId, date);
    dailyMealRepository.deleteById(findDailyMeal.getDailyMealId());
  }
  
  public DailyMeal verifyExistsEachMealByDate(long memberId, LocalDate date) {
    Optional<DailyMeal> optionalDailyMeal = dailyMealRepository.findDailyMealByDate(date, memberId);
    return optionalDailyMeal.orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
}


