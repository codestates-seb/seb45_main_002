package NutrientsCoders.main_project.Analysis.controller;

import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.Analysis.dto.AnalysisViewResponseDto;
import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.Analysis.mapper.AnalysisMapper;
import NutrientsCoders.main_project.Analysis.service.AnalysisService;
import NutrientsCoders.main_project.dailymeal.dto.DailyMealSimpleResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.dailymeal.service.DailyMealService;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.PagedResponse;
import NutrientsCoders.main_project.utils.TokenChanger;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {
  private final AnalysisService analysisService;
  private final AnalysisMapper analysisMapper;
  private final TokenChanger tokenChanger;
  private final DailyMealService dailyMealService;
  private final MemberService memberService;
  
  public AnalysisController(AnalysisService analysisService, AnalysisMapper analysisMapper,
                            TokenChanger tokenChanger, DailyMealService dailyMealService, MemberService memberService) {
    this.analysisService = analysisService;
    this.analysisMapper = analysisMapper;
    this.tokenChanger = tokenChanger;
    this.dailyMealService = dailyMealService;
    this.memberService = memberService;
  }
  
  //작성한 분석 저장
  @PostMapping("/{dailymeal-id}")
  public ResponseEntity<AnalysisResponseDto> createAnalysis(@RequestHeader("Authorization") String token,
                                                              @PathVariable("dailymeal-id") long dailyMealId) throws Exception {
    try {
      long memberId = tokenChanger.getMemberId(token);
      DailyMeal dailyMeal = dailyMealService.findByDailyMeal(dailyMealId, memberId);
      Double needKcal = Double.valueOf(memberService.findMember(memberId).getNeedKcal());
      Analysis analysis = analysisService.createAnalysis(dailyMeal, needKcal);
      AnalysisResponseDto response = analysisMapper.analysisToAnalysisResponseDto(analysis);
      
      return new ResponseEntity<>(response, HttpStatus.CREATED);
    } catch (NullPointerException e) {
      throw new LogicException(ExceptionCode.BMI_NOT_FOUND);
    }
  }
  //작성한 분석 조회(Id)
  @GetMapping("/{anlysis-id}")
  public ResponseEntity<AnalysisResponseDto> getAnalysisById(@PathVariable("anlysis-id") long analysisId) {
    Analysis analysis = analysisService.findByAnalysis(analysisId);
    AnalysisResponseDto response = analysisMapper.analysisToAnalysisResponseDto(analysis);
    
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
  
  //작성된 분석 전체 조회
  @GetMapping
  public ResponseEntity<PagedResponse<AnalysisViewResponseDto>> getAnalyses(@RequestHeader("Authorization") String token,
                                                                        @RequestParam("page") int page, @RequestParam("size") int size) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    Pageable pageable = PageRequest.of(page - 1, size);
    Page<Analysis> analyses = analysisService.findByAllAnalysis(memberId, pageable);
    List<AnalysisViewResponseDto> response = analysisMapper.analysesToAnalysisResponseDtos(analyses.getContent());
    
    PagedResponse<AnalysisViewResponseDto> pagedResponse = new PagedResponse<>(
        response, analyses.getTotalElements(), analyses.getTotalPages(), analyses.isLast()
    );
    
    return  new ResponseEntity<>(pagedResponse, HttpStatus.OK);
  }
  
  
  //작성한 분석 삭제
  @DeleteMapping("/{anlysis-id}")
  public ResponseEntity<AnalysisResponseDto> deleteAnalysis(@PathVariable("anlysis-id") long analysisId) {
    analysisService.deleteAnalysis(analysisId);
    
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
