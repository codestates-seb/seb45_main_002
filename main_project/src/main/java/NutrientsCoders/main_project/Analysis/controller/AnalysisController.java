package NutrientsCoders.main_project.Analysis.controller;

import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.Analysis.mapper.AnalysisMapper;
import NutrientsCoders.main_project.Analysis.service.AnalysisService;
import NutrientsCoders.main_project.dailymeal.dto.AnalysisDto;
import NutrientsCoders.main_project.dailymeal.dto.AnalysisMultiResponseDto;
import NutrientsCoders.main_project.dailymeal.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.Analysis;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.service.DailyMealService;
import NutrientsCoders.main_project.utils.TokenChanger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {
  private AnalysisService analysisService;
  private AnalysisMapper analysisMapper;
  private TokenChanger tokenChanger;
  private DailyMealService dailyMealService;
  
  public AnalysisController(AnalysisService analysisService, AnalysisMapper analysisMapper, TokenChanger tokenChanger, DailyMealService dailyMealService) {
    this.analysisService = analysisService;
    this.analysisMapper = analysisMapper;
    this.tokenChanger = tokenChanger;
    this.dailyMealService = dailyMealService;
  }
  
  //작성한 분석 저장
  @PostMapping({"/{dailymeal-id}"})
  public ResponseEntity<AnalysisResponseDto> createAnalysis(@RequestHeader("Authorization") String token,
                                                              @PathVariable("dailymeal-id") long dailyMealId) {
    long memberId = tokenChanger.getMemberId(token);
    DailyMeal dailyMeal = dailyMealService.findByDailyMeal(memberId, dailyMealId);
    Analysis analysis = analysisService.createAnalysis(dailyMeal, memberId);
    AnalysisResponseDto response = analysisMapper.analysisToAnalysisResponseDto(analysis);
    
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  
  //작성한 분석 조회(Id)
  @GetMapping("/{dailymeal-id}")
  public ResponseEntity<AnalysisResponseDto> getAnalysisById(@RequestHeader("Authorization") String token,
                                                               @PathVariable("dailymeal-id") long analysisId) {
    long memberId = tokenChanger.getMemberId(token);
    Analysis analysis = analysisService.findByAnalysis(memberId, analysisId);
    AnalysisResponseDto response = analysisMapper.analysisToAnalysisResponseDto(analysis);
    
    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  //작성한 분석 삭제
  @DeleteMapping("/{dailymeal-id}")
  public ResponseEntity<AnalysisResponseDto> deleteAnalysis(@RequestHeader("Authorization") String token,
                                                              @PathVariable("dailymeal-id") long analysisId) {
    long memberId = tokenChanger.getMemberId(token);
    analysisService.deleteAnalysis(analysisId, memberId);
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
