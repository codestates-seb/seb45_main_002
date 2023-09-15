package NutrientsCoders.main_project.dailymeal.service;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealDateRepository;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealRepository;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DailyMealService {
  private final DailyMealRepository dailyMealRepository;
  private final DailyMealDateRepository dailyMealDateService;
  private final MemberService memberService;
  public DailyMealService(DailyMealRepository dailyMealRepository, DailyMealDateRepository dailyMealDateService, MemberService memberService) {
    this.dailyMealRepository = dailyMealRepository;
    this.dailyMealDateService = dailyMealDateService;
    this.memberService = memberService;
  }
  
  //식단 저장
  @Transactional
  public DailyMeal createDailyMeal(DailyMeal dailyMeal, List<EachMeal> eachMeals, long memberId) throws Exception {
    Optional<DailyMeal> existDailyMeal = dailyMealDateService.findDailyMealByDate(dailyMeal.getDate(), memberId);
    if (existDailyMeal.isPresent()) {throw new LogicException(ExceptionCode.DATE_EXISTS);}
    
    eachMeals.forEach(eachMeal -> {
      eachMeal.setDailyMeal(dailyMeal);
      eachMeal.calculateTotal();
    });
    dailyMeal.setEachMeals(eachMeals);
    dailyMeal.setMember(memberService.findMember(memberId));
    dailyMeal.calculateTotal();
    return dailyMealRepository.save(dailyMeal);
  }
  
  //선택 식단 조회(ID)
  @Transactional(readOnly = true)
  public DailyMeal findByDailyMeal(long dailyMealId, long memberId) {
    return verifyExistsEachMeal(dailyMealId, memberId);
  }
  
  //전체 식단 조회(선호)
  @Transactional(readOnly = true)
  public Page<DailyMeal> findByfavoritDailyMeals(long memberId, Pageable pageable) {
    Page<DailyMeal> dailyMeals = dailyMealRepository.findAllfavoriteByMemeberId(memberId, pageable);
    
    return Optional.of(dailyMeals)
            .filter(list -> !list.isEmpty())
            .orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  //선택 식단 수정(ID)
  @Transactional
  public DailyMeal updateDailyMeal(DailyMeal dailyMeal, List<EachMeal> eachMeals, long dailyMealId, long memberId) throws Exception {
    //날짜 입력시
    if (!(dailyMeal.getDate() == null)){
    DailyMeal dailyMealWithDate = createDailyMeal(dailyMeal, eachMeals, memberId);
      return dailyMealRepository.save(dailyMealWithDate);
    }
    
    DailyMeal findDailyMeal = verifyExistsEachMeal(dailyMealId, memberId);
    eachMeals.forEach(eachMeal -> eachMeal.setDailyMeal(findDailyMeal));
    findDailyMeal.setEachMeals(eachMeals);
    findDailyMeal.setName(dailyMeal.getName());
    findDailyMeal.calculateTotal();
    return dailyMealRepository.save(findDailyMeal);
  }
  //선택 식단 삭제(ID)
  @Transactional
  public void deleteDailyMeal(long dailyMealId, long memberId) {
    DailyMeal findDailyMeal = verifyExistsEachMeal(dailyMealId, memberId);
    dailyMealRepository.deleteById(findDailyMeal.getDailyMealId());
  }
  
  public DailyMeal verifyExistsEachMeal(long dailyMealId, long memberId) {
    Optional<DailyMeal> optionalDailyMeal = dailyMealRepository.findDailyMealById(dailyMealId, memberId);
    return optionalDailyMeal.orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
}


