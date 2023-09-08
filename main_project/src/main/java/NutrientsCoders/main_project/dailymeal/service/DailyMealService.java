package NutrientsCoders.main_project.dailymeal.service;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealRepository;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DailyMealService {
  private final DailyMealRepository dailyMealRepository;
  private final MemberService memberService;
  public DailyMealService(DailyMealRepository dailyMealRepository, MemberService memberService) {
    this.dailyMealRepository = dailyMealRepository;
    this.memberService = memberService;
  }
  
  //식단 저장
  public DailyMeal createDailyMeal(DailyMeal dailyMeal, List<EachMeal> eachMeals, long memberId) throws Exception {
    dailyMeal.setEachMeals(eachMeals);
    dailyMeal.setMember(memberService.findMember(memberId));
    dailyMeal.calculateTotal();
//    DailyMeal analyzedDailyMeal = analyzeMeal(dailyMeal);
    return dailyMealRepository.save(dailyMeal);
  }
  
  //선택 식단 조회(ID)
  public DailyMeal findByDailyMeal(long dailyMealId, long memberId) {
    return verifyExistsEachMeal(dailyMealId, memberId);
  }
  
  //전체 식단 조회(선호)
  public List<DailyMeal> findByfavoritDailyMeals(long memberId) {
    List<DailyMeal> dailyMeals = dailyMealRepository.findAllfavoriteByMemeberId(memberId);
    return Optional.of(dailyMeals)
        .filter(list -> !list.isEmpty())
        .orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  
  //선택 식단 수정(ID)
  public DailyMeal updateDailyMeal(DailyMeal dailyMeal, long dailyMealId, long memberId) {
    DailyMeal findDailyMeal = verifyExistsEachMeal(dailyMealId, memberId);
    findDailyMeal.setEachMeals(dailyMeal.getEachMeals());
    return dailyMealRepository.save(dailyMeal);
  }
  
  //선택 식단 삭제(ID)
  public void deleteDailyMeal(long dailyMealId, long memberId) {
    DailyMeal findDailyMeal = verifyExistsEachMeal(dailyMealId, memberId);
    dailyMealRepository.deleteById(findDailyMeal.getDailyMealId());
  }
  
  public DailyMeal verifyExistsEachMeal(long dailyMealId, long memberId) {
    Optional<DailyMeal> optionalDailyMeal = dailyMealRepository.findDailyMealById(dailyMealId, memberId);
    return optionalDailyMeal.orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
}


