package NutrientsCoders.main_project.dailymeal.controller;

import NutrientsCoders.main_project.dailymeal.dto.DailyMealDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealMultiResponseDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.mapper.DailyMealMapper;
import NutrientsCoders.main_project.dailymeal.service.DailyMealService;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.service.EachMealService;
import NutrientsCoders.main_project.utils.TokenChanger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@RestController
@RequestMapping("/dailymeals")
public class DailyMealController {
  private final DailyMealService dailyMealService;
  private final DailyMealMapper dailyMealMapper;
  private final EachMealService eachMealService;
  private final TokenChanger tokenChanger;
  
  public DailyMealController(DailyMealService dailyMealService, DailyMealMapper dailyMealMapper, EachMealService eachMealService, TokenChanger tokenChanger) {
    this.dailyMealService = dailyMealService;
    this.dailyMealMapper = dailyMealMapper;
    this.eachMealService = eachMealService;
    this.tokenChanger = tokenChanger;
  }
  
  //작성한 식단 저장
  @PostMapping
  public ResponseEntity<DailyMealResponseDto> yourEndpoint(@RequestHeader("Authorization") String token,
                                                           @RequestBody DailyMealDto dailyMealDto) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    List<EachMeal> eachMeals = dailyMealDto.getEachMeals().stream()
        .map(eachMealService::findByEachMeal)
        .collect(Collectors.toList());
    
    DailyMeal dailyMeal = dailyMealService.createDailyMeal(
        dailyMealMapper.dailyMealDtoToDailyMeal(dailyMealDto), eachMeals, memberId);
        DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  //작성한 식단 조회
  @GetMapping("/{dateStr}")
  public ResponseEntity<DailyMealResponseDto> getDailyMeal(@RequestHeader("Authorization") String token,
                                                           @PathVariable("dateStr") String dateStr) {
    long memberId = tokenChanger.getMemberId(token);
    LocalDate date = LocalDate.parse(dateStr);
    DailyMeal dailyMeal = dailyMealService.findByDailyMeal(memberId, date);
    DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);

    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  //맴버 식단 전체 조회
  @GetMapping
  public ResponseEntity<List<DailyMealMultiResponseDto>> getDailyMeals(@RequestHeader("Authorization") String token) {
    long memberId = tokenChanger.getMemberId(token);
    List<DailyMeal> dailyMeals = dailyMealService.findByDailyMeals(memberId);
    List<DailyMealMultiResponseDto> response = dailyMealMapper.dailyMealsToDailyMealResponseDtos(dailyMeals);
    
    return new ResponseEntity<>(response,HttpStatus.OK);
  }

  //작성한 식단 수정
  @PatchMapping("/{dateStr}")
  public ResponseEntity<DailyMealResponseDto> patchDailyMeal(@RequestHeader("Authorization") String token,
                                                             @RequestBody DailyMealDto dailyMealDto,
                                                             @PathVariable("dateStr") String dateStr) {
    long memberId = tokenChanger.getMemberId(token);
    LocalDate date = LocalDate.parse(dateStr);
    DailyMeal dailyMeal = dailyMealMapper.dailyMealDtoToDailyMeal(dailyMealDto);
    DailyMeal updateDailyMeal = dailyMealService.updateDailyMeal(memberId, dailyMeal, date);
    DailyMealResponseDto response
        = dailyMealMapper.dailyMealToDailyMealResponseDto(updateDailyMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //작성한 식단 삭제
  @DeleteMapping("/{dateStr}")
  public ResponseEntity<DailyMealResponseDto> deleteDailyMeal(@RequestHeader("Authorization") String token,
                                                              @PathVariable("dateStr") String dateStr) {
    long memberId = tokenChanger.getMemberId(token);
    LocalDate date = LocalDate.parse(dateStr);
    dailyMealService.deleteDailyMeal(date, memberId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
