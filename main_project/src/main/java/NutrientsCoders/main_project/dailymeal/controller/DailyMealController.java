package NutrientsCoders.main_project.dailymeal.controller;

import NutrientsCoders.main_project.dailymeal.dto.DailyMealDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealSimpleResponseDto;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.mapper.DailyMealMapper;
import NutrientsCoders.main_project.dailymeal.service.DailyMealService;
import NutrientsCoders.main_project.dailymeal.service.DailyMealSuggestService;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.service.EachMealService;
import NutrientsCoders.main_project.utils.TokenChanger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Validated
@RestController
@RequestMapping("/dailymeals")
public class DailyMealController {
  private final DailyMealService dailyMealService;
  private final DailyMealMapper dailyMealMapper;
  private final EachMealService eachMealService;
  private final DailyMealSuggestService dailyMealSuggests;
  private final TokenChanger tokenChanger;
  
  public DailyMealController(DailyMealService dailyMealService, DailyMealMapper dailyMealMapper,
                             EachMealService eachMealService, DailyMealSuggestService dailyMealSuggests, TokenChanger tokenChanger) {
    this.dailyMealService = dailyMealService;
    this.dailyMealSuggests = dailyMealSuggests;
    this.dailyMealMapper = dailyMealMapper;
    this.eachMealService = eachMealService;
    this.tokenChanger = tokenChanger;
  }
  
  //작성한 식단 저장
  @PostMapping
  public ResponseEntity<DailyMealResponseDto> createDailyMeal(@RequestHeader("Authorization") String token,
                                                           @RequestBody DailyMealDto dailyMealDto) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    List<EachMeal> eachMeals = dailyMealDto.getEachMeals().stream()
        .map(eachMeal -> eachMealService.findByEachMeal(eachMeal, memberId))
        .collect(Collectors.toList());
    
    DailyMeal dailyMeal = dailyMealService.createDailyMeal(
        dailyMealMapper.dailyMealDtoToDailyMeal(dailyMealDto), eachMeals, memberId);
        DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }
  
  
  //작성한 식단 조회(Id)
  @GetMapping("/{dailymeal-id}")
  public ResponseEntity<DailyMealResponseDto> getDailyMealById(@RequestHeader("Authorization") String token,
                                                           @PathVariable("dailymeal-id") long dailyMealId) {
    long memberId = tokenChanger.getMemberId(token);
    DailyMeal dailyMeal = dailyMealService.findByDailyMeal(dailyMealId, memberId);
    DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);
    
    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  //식단 전체 조회(선호)
  @GetMapping
  public ResponseEntity<List<DailyMealSimpleResponseDto>> getDailyMealsByFavorite(@RequestHeader("Authorization") String token,
                                                                                  @RequestParam int page, @RequestParam int size) {
    Pageable pageable = PageRequest.of(page - 1, size);
    long memberId = tokenChanger.getMemberId(token);
    Page<DailyMeal> dailyMeals = dailyMealService.findByfavoritDailyMeals(memberId, pageable);
    List<DailyMealSimpleResponseDto> response = dailyMealMapper.dailyMealsToDailyMealResponseDtos(dailyMeals.getContent());

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  //작성한 식단 수정
  @PatchMapping("/{dailymeal-id}")
  public ResponseEntity<DailyMealResponseDto> patchDailyMeal(@RequestHeader("Authorization") String token,
                                                             @RequestBody DailyMealDto dailyMealDto,
                                                             @PathVariable("dailymeal-id") long dailyMealId) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    DailyMeal dailyMeal = dailyMealMapper.dailyMealDtoToDailyMeal(dailyMealDto);
    List<EachMeal> eachMeals = dailyMealDto.getEachMeals().stream()
                                           .map(eachMeal -> eachMealService.findByEachMeal(eachMeal, memberId))
                                           .collect(Collectors.toList());
    
    DailyMeal updateDailyMeal = dailyMealService.updateDailyMeal(dailyMeal, eachMeals, dailyMealId, memberId);
    DailyMealResponseDto response
        = dailyMealMapper.dailyMealToDailyMealResponseDto(updateDailyMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //작성한 식단 삭제
  @DeleteMapping("/{dailymeal-id}")
  public ResponseEntity<DailyMealResponseDto> deleteDailyMeal(@RequestHeader("Authorization") String token,
                                                              @PathVariable("dailymeal-id") long dailyMealId) {
    long memberId = tokenChanger.getMemberId(token);
    dailyMealService.deleteDailyMeal(dailyMealId, memberId);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
  //  식단 추천 받기
  @PatchMapping("/suggest/{dailymeal-id}")
  public ResponseEntity<DailyMealResponseDto> createSuggestDailyMeal(@RequestHeader("Authorization") String token,
                                                                     @PathVariable("dailymeal-id") long dailyMealId) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    DailyMeal dailyMeal = dailyMealSuggests.suggestDailyMeal(dailyMealId, memberId);
    DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }
}
