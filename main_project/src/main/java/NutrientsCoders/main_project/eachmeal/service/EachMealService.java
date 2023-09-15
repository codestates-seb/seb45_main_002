package NutrientsCoders.main_project.eachmeal.service;

import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.eachmeal.repository.EachMealFoodRepository;
import NutrientsCoders.main_project.eachmeal.repository.EachMealRepository;
import NutrientsCoders.main_project.food.entity.Food;
import NutrientsCoders.main_project.food.service.FoodService;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EachMealService {  
  private final EachMealRepository eachMealRepository;
  private final FoodService foodService;
  private final EachMealFoodRepository eachMealFoodRepository;
  private final MemberService memberService;
  
  public EachMealService(EachMealRepository eachMealRepository, FoodService foodService, EachMealFoodRepository eachMealFoodRepository, MemberService memberService) {
    this.eachMealRepository = eachMealRepository;
    this.eachMealFoodRepository = eachMealFoodRepository;
    this.foodService = foodService;
    this.memberService = memberService;
  }
  //foodId로 food 엔티티를 찾아 끼니 저장
  @Transactional
  public EachMeal createEachMeal(EachMeal eachMeal, List<EachMealFood> eachMealFoods, long memberId) throws Exception {
    eachMealFoods = eachMealFoodsfindFood(eachMealFoods, eachMeal);
    eachMeal.setMember(memberService.findMember(memberId));
    eachMeal.setEachMealFoods(eachMealFoods);
    eachMeal.calculateTotal();
    
    return eachMealRepository.save(eachMeal);
  }
  //선택 끼니 조회
  @Transactional
  public EachMeal findByEachMeal(long eachMealId, long memberId) {
    return verifyExistsEachMeal(eachMealId, memberId);
  }
  
  //끼니 전체 조회
  public Page<EachMeal> findByEachMeals(long memberId, Pageable pageable) {
    return eachMealRepository.findEachMealByMemberId(memberId, pageable);
  }
  
  public Page<EachMeal> findByfavoriteEachMeals(long memberId, Pageable pageable) {
    return eachMealRepository.findFavoriteEachMealByMemberId(memberId, pageable);
  }
  
  //선택 끼니 수정
  @Transactional
  public EachMeal updateEachMeal(long memberId, EachMeal eachMeal, List<EachMealFood> newEachMealFoods, long eachMealId) {
    EachMeal findEachMeal = verifyExistsEachMeal(eachMealId, memberId);
    eachMealFoodRepository.deleteEachMealFoodsByEachMeal_EachMealId(eachMealId);
    List<EachMealFood> eachMealFoodsfindFood = eachMealFoodsfindFood(newEachMealFoods, eachMeal);
    findEachMeal.setEachMealFoods(eachMealFoodsfindFood);
    findEachMeal.getEachMealFoods().forEach(eachMealFood -> eachMealFood.setEachMeal(findEachMeal));
    findEachMeal.setFavorite(eachMeal.getFavorite());
    
    return eachMealRepository.save(findEachMeal);
  }
  
  //선택 끼니 삭제
  @Transactional
  public void deleteEachMeal(long eachMealId, long memberId) {
    eachMealRepository.delete(verifyExistsEachMeal(eachMealId, memberId));
  }
  
  //전체 eachMealFood 목록 삭제
  private EachMeal verifyExistsEachMeal(long eachMealId, long memberId) {
    Optional<EachMeal> optionalEachMeal = eachMealRepository.findByEachMealId(eachMealId, memberId);
    return optionalEachMeal.orElseThrow(() -> new LogicException(ExceptionCode.EACHMEAL_NOT_FOUND));
  }
  //EachMealFood의 FoodId값으로 Food객체를 찾은 후 비율을 분석하여 EachMeal에 다시 저장합니다
  private List<EachMealFood> eachMealFoodsfindFood(List<EachMealFood> eachMealFoods, EachMeal eachMeal) {
    
    return eachMealFoods.stream().peek(eachMealFood -> {
      long foodId = eachMealFood.getFood().getFoodId();
      Food findFood  = foodService.findByFood(foodId);
      eachMealFood.setFood(findFood);
      eachMealFood.setEachMeal(eachMeal);
      eachMealFood.calculateRate();
    }).collect(Collectors.toList());
  }
}