package NutrientsCoders.main_project.Analysis.controller;

import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.Analysis.mapper.AnalysisMapper;
import NutrientsCoders.main_project.Analysis.service.AnalysisService;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.mapper.DailyMealMapper;
import NutrientsCoders.main_project.dailymeal.service.DailyMealService;
import NutrientsCoders.main_project.dailymeal.service.DailyMealSuggestService;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.TokenChanger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {
  private final AnalysisService analysisService;
  private final AnalysisMapper analysisMapper;
  private final TokenChanger tokenChanger;
  private final DailyMealService dailyMealService;
  private final MemberService memberService;
  private final DailyMealSuggestService dailyMealSuggestService;
  private final DailyMealMapper dailyMealMapper;
  
  public AnalysisController(AnalysisService analysisService, AnalysisMapper analysisMapper,
                            TokenChanger tokenChanger, DailyMealService dailyMealService, MemberService memberService, DailyMealSuggestService dailyMealSuggestService, DailyMealMapper dailyMealMapper) {
    this.analysisService = analysisService;
    this.analysisMapper = analysisMapper;
    this.tokenChanger = tokenChanger;
    this.dailyMealService = dailyMealService;
    this.memberService = memberService;
    this.dailyMealSuggestService = dailyMealSuggestService;
    this.dailyMealMapper = dailyMealMapper;
  }
  
  //작성한 분석 저장
  @PostMapping("/{dailymeal-id}")
  public ResponseEntity<AnalysisResponseDto> createAnalysis(@RequestHeader("Authorization") String token,
                                                              @PathVariable("dailymeal-id") long dailyMealId) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    DailyMeal dailyMeal = dailyMealService.findByDailyMeal(dailyMealId, memberId);
    Double needKacl = Double.valueOf(memberService.findMember(memberId).getNeedKcal());
    Analysis analysis = analysisService.createAnalysis(dailyMeal, needKacl);
    AnalysisResponseDto response = analysisMapper.analysisToAnalysisResponseDto(analysis);
    
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  //작성한 분석 조회(Id)
  @GetMapping("/{dailymeal-id}")
  public ResponseEntity<AnalysisResponseDto> getAnalysisById(@PathVariable("dailymeal-id") long analysisId) {
    Analysis analysis = analysisService.findByAnalysis(analysisId);
    AnalysisResponseDto response = analysisMapper.analysisToAnalysisResponseDto(analysis);
    
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  //작성한 분석 삭제
  @DeleteMapping("/{dailymeal-id}")
  public ResponseEntity<AnalysisResponseDto> deleteAnalysis(@PathVariable("dailymeal-id") long analysisId) {
    analysisService.deleteAnalysis(analysisId);
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
//  작성한 식단 저장
  @PostMapping("/suggest/{analysis-id}")
  public ResponseEntity<DailyMealResponseDto> createSuggestDailyMeal(@RequestHeader("Authorization") String token,
                                                                     @PathVariable("analysis-id") long analysisId) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    DailyMeal dailyMeal = dailyMealSuggestService.suggestDailyMeal(analysisId, memberId);
    DailyMealResponseDto response = dailyMealMapper.dailyMealToDailyMealResponseDto(dailyMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
