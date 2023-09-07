package NutrientsCoders.main_project.dailymeal.service;

import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.repository.DailyMealRepository;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
//    EachMeal analyzedDailyMeal = analyzeMeal(dailyMeal);
    return dailyMealRepository.save(dailyMeal);
  }

  //선택 식단 조회(날짜)
  public DailyMeal findByDailyMeal(long memberId, LocalDate date) {
    return verifyExistsEachMealByDate(memberId, date);
  }
  
  //선택 식단 조회(ID)
  public DailyMeal findByDailyMeal(long memberId, long dailyMealId) {
    Optional<DailyMeal> optionalDailyMeal = dailyMealRepository.findDailyMealById(dailyMealId, memberId);
    return optionalDailyMeal.orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  
  //전체 식단 조회(캘린더)
  public List<DailyMeal> findByDateDailyMeals(long memberId) {
    List<DailyMeal> dailyMeals = dailyMealRepository.findAllDateByMemberId(memberId);
    return Optional.of(dailyMeals)
        .filter(list -> !list.isEmpty())
        .orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  
  //전체 식단 조회(선호)
  public List<DailyMeal> findByfavoritDailyMeals(long memberId) {
    List<DailyMeal> dailyMeals = dailyMealRepository.findAllfavoriteByMemeberId(memberId);
    return Optional.of(dailyMeals)
        .filter(list -> !list.isEmpty())
        .orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  
  //식단 수정
  public DailyMeal updateDailyMeal(long memberId, DailyMeal dailyMeal, LocalDate date) {
    DailyMeal findDailyMeal = verifyExistsEachMealByDate(memberId, date);
    findDailyMeal.setEachMeals(dailyMeal.getEachMeals());
    return dailyMealRepository.save(dailyMeal);
  }
  
  //식단 삭제
  public void deleteDailyMeal(LocalDate date, long memberId) {
    DailyMeal findDailyMeal = verifyExistsEachMealByDate(memberId, date);
    dailyMealRepository.deleteById(findDailyMeal.getDailyMealId());
  }
  
  public DailyMeal verifyExistsEachMealByDate(long memberId, LocalDate date) {
    Optional<DailyMeal> optionalDailyMeal = dailyMealRepository.findDailyMealByDate(date, memberId);
    return optionalDailyMeal.orElseThrow(() -> new LogicException(ExceptionCode.DAILYMEAL_NOT_FOUND));
  }
  
  //식단 분석 메서드
  private EachMeal analyzeMeal(DailyMeal dailyMeal) {
    //    Long kacl = eachMeal.getTotalEachKcal();
//    Double carbohydrates = eachMeal.getTotalEachCarbo();
//    Double proteins = eachMeal.getTotalEachProtein();
//    Double fats = eachMeal.getTotalEachFat();
//
//
//    calculator(carbohydrates, proteins, fats);//무엇을 계산해서 보여줄까??
//  private static void calculator(Double carbohydrates, Double proteins, Double fats) {
//    //총 섭취 그램 수 계산
//    double totalGrams = carbohydrates + proteins + fats;
//
//    //섭취 탄단지 비율 계산
//    double percentCarbo = (carbohydrates / totalGrams) * 100;
//    double percentProteins = (proteins / totalGrams) * 100;
//    double percentFats = (fats / totalGrams) * 100;
//
//    //칼로리 대비 적정량 계산(실제는 그람 대비임)
//    double idealCarbohydrates = totalGrams * (3.0 / 10.0);
//    double idealProteins = totalGrams * (5.0 / 10.0);
//    double idealFats = totalGrams * (2.0 / 10.0);
//
//    //적정량 대비 초과, 부족(양)
//    double overCarbohydrates = Math.abs(carbohydrates - idealCarbohydrates);
//    double overProteins = Math.abs(proteins - idealProteins);
//    double overFats = Math.abs(fats - idealFats);
//
//    //적정량 대비 초과, 부족(비율)
//    double overPercentCarbo = ((carbohydrates - idealCarbohydrates) / idealCarbohydrates) * 100;
//    double overPercentProteins = ((proteins - idealProteins) / idealProteins) * 100;
//    double overPercentFats = ((fats - idealFats) / idealFats) * 100;
//  }
    return null;
  }
  

}


