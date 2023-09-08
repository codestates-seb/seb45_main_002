package NutrientsCoders.main_project.dailymeal.controller;

import NutrientsCoders.main_project.dailymeal.dto.DailyMealDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealMultiResponseDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.mapper.DailyMealMapper;
import NutrientsCoders.main_project.dailymeal.service.DailyMealDateService;
import NutrientsCoders.main_project.eachmeal.service.EachMealService;
import NutrientsCoders.main_project.utils.TokenChanger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Validated
@RestController
@RequestMapping("/dailymeals/date")
public class DailyMealDateController {
  private final DailyMealDateService dailyMealDateService;
  private final DailyMealMapper dailyMealMapper;
  private final TokenChanger tokenChanger;
  
  public DailyMealDateController(DailyMealDateService dailyMealDateService, DailyMealMapper dailyMealMapper, TokenChanger tokenChanger) {
    this.dailyMealDateService = dailyMealDateService;
    this.dailyMealMapper = dailyMealMapper;
    this.tokenChanger = tokenChanger;
  }
  
    //작성한 식단 조회(날짜)
  @GetMapping("{dateStr}")
  public ResponseEntity<DailyMealResponseDto> getDailyMealByDate(@RequestHeader("Authorization") String token,
                                                           @PathVariable("dateStr") String dateStr) {
    long memberId = tokenChanger.getMemberId(token);
    LocalDate date = LocalDate.parse(dateStr);
    DailyMeal dailyMeal = dailyMealDateService.findByDate(memberId, date);
    DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);

    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  
  //식단 전체 조회(캘린더)
  @GetMapping
  public ResponseEntity<List<DailyMealMultiResponseDto>> getDailyMealsByDate(@RequestHeader("Authorization") String token) {
    long memberId = tokenChanger.getMemberId(token);
    List<DailyMeal> dailyMeals = dailyMealDateService.findAllByDate(memberId);
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
    DailyMeal updateDailyMeal = dailyMealDateService.updateDateDailyMeal(memberId, dailyMeal, date);
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
    dailyMealDateService.deleteDateDailyMeal(date, memberId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
