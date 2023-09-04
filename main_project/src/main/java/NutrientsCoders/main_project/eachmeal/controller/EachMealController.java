package NutrientsCoders.main_project.eachmeal.controller;

import NutrientsCoders.main_project.eachmeal.dto.EachMealDto;
import NutrientsCoders.main_project.eachmeal.dto.EachMealResponseDto;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.eachmeal.mapper.EachMealMapper;
import NutrientsCoders.main_project.eachmeal.service.EachMealService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eachmeals")
public class EachMealController {
  private final EachMealService eachMealService;
  private final EachMealMapper eachMealMapper;
  
  public EachMealController(EachMealService eachMealService, EachMealMapper eachMealMapper) {
    this.eachMealService = eachMealService;
    this.eachMealMapper = eachMealMapper;
  }
  
  //작성한 끼니 저장
  @PostMapping
  public ResponseEntity<EachMealResponseDto> postEachMeal(@RequestBody EachMealDto eachMealDto) {
    List<EachMealFood> eachMealFoods = eachMealMapper.eachMealFoodDtosToEachMealFoods(eachMealDto.getFoods());
    EachMeal eachMeal = eachMealMapper.eachMealDtoToEachMeal(eachMealDto);
    EachMeal savedEachMeal = eachMealService.createEachMeal(eachMeal, eachMealFoods);
    EachMealResponseDto response = eachMealMapper.eachMealToEachMealResponseDto(savedEachMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  //작성한 끼니 조회
  @GetMapping("/{eachmealid}")
  public ResponseEntity<EachMealResponseDto> getEachMeal(@PathVariable("eachmealid") long eachMealId) {
    EachMeal eachMeal = eachMealService.findByEachMeal(eachMealId);
    EachMealResponseDto response = eachMealMapper.eachMealToEachMealResponseDto(eachMeal);

    return new ResponseEntity<>(response,HttpStatus.OK);
  }

  //작성한 끼니 수정
  @PatchMapping("/{eachmealid}")
  public ResponseEntity<EachMealResponseDto> patchEachMeal(@PathVariable("eachmealid") long eachMealId,
      @RequestBody EachMealDto eachMealDto) {
    List<EachMealFood> eachMealFoods = eachMealMapper.eachMealFoodDtosToEachMealFoods(eachMealDto.getFoods());
    EachMeal eachMeal = eachMealMapper.eachMealDtoToEachMeal(eachMealDto);
    EachMeal updateEachMeal = eachMealService.updateEachMeal(eachMeal, eachMealFoods, eachMealId);
    
    EachMealResponseDto response
        = eachMealMapper.eachMealToEachMealResponseDto(updateEachMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //작성한 끼니 삭제
  @DeleteMapping("/{eachmealid}")
  public ResponseEntity<EachMealResponseDto> deleteEachMeal(@PathVariable("eachmealid") long eachmealid) {
   eachMealService.deleteEachMeal(eachmealid);
  
  return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}
  
  
  //끼니 비우기(수정 시 기존 음식을 지울 때 사용)
  @DeleteMapping("/{eachmealid}/foodreset")
  public ResponseEntity<EachMealResponseDto> clearEachMealFood(@PathVariable("eachmealid") long eachmealid) {
    eachMealService.deleteEachMealFoods(eachmealid);
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
