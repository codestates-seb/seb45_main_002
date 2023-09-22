package NutrientsCoders.main_project.Analysis.mapper;

import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.Analysis.dto.AnalysisViewResponseDto;
import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnalysisMapper {
  default AnalysisResponseDto analysisToAnalysisResponseDto(Analysis savedanalysis) {
    if ( savedanalysis == null ) {
      return null;
    }
    
    AnalysisResponseDto.idealMacro analysisToidealMacro =
        AnalysisResponseDto.idealMacro.builder()
            .idealCarbohydrates(savedanalysis.getIdealCarbohydrates())
            .idealProteins(savedanalysis.getIdealProteins())
            .idealFats(savedanalysis.getIdealFats()).build();
    
    AnalysisResponseDto.overMacro analysisToOverMacro =
        AnalysisResponseDto.overMacro.builder()
            .overCarbohydrates(savedanalysis.getOverCarbohydrates())
            .overProteins(savedanalysis.getOverProteins())
            .overFats(savedanalysis.getOverFats()).build();
    
    AnalysisResponseDto.percentMacro analysisToPercentMacro =
        AnalysisResponseDto.percentMacro.builder()
            .percentCarbos(savedanalysis.getPercentCarbos())
            .percentProteins(savedanalysis.getPercentProteins())
            .percentFats(savedanalysis.getPercentFats()).build();
    
    AnalysisResponseDto.overPercentMacro analysisToOverPercentMacro =
        AnalysisResponseDto.overPercentMacro.builder()
            .overPercentCarbos(savedanalysis.getOverPercentCarbos())
            .overPercentProteins(savedanalysis.getOverPercentProteins())
            .overPercentFats(savedanalysis.getOverPercentFats()).build();
    
    AnalysisResponseDto analysisResponseDto =
        AnalysisResponseDto.builder()
            .analysisId(savedanalysis.getAnalysisId())
            .weight(savedanalysis.getWeight())
            .height(savedanalysis.getHeight())
            .dailyMeal(dailyMealToDailyMealSimpleResponseDto(savedanalysis.getDailyMeal()))
            .idealKcal(savedanalysis.getIdealKcal())
            .overKcal(savedanalysis.getOverKcal())
            .idealMacro(analysisToidealMacro)
            .overMacro(analysisToOverMacro)
            .percentMacro(analysisToPercentMacro)
            .overPercentMacro(analysisToOverPercentMacro)
            .result(savedanalysis.getResult())
            .auctionURL(savedanalysis.getAuctionURL())
            .naverURL(savedanalysis.getNaverURL())
            .coupangURL(savedanalysis.getCoupangURL()).build();
    
    return analysisResponseDto;
    
  }
  
  default AnalysisViewResponseDto analysisToAnalysisViewResponseDto(Analysis savedanalysis) {
    if ( savedanalysis == null ) {
      return null;
    }
    AnalysisViewResponseDto.percentMacro analysisToPercentMacro =
        AnalysisViewResponseDto.percentMacro.builder()
                                        .percentCarbos(savedanalysis.getPercentCarbos())
                                        .percentProteins(savedanalysis.getPercentProteins())
                                        .percentFats(savedanalysis.getPercentFats()).build();
    
    AnalysisViewResponseDto.overPercentMacro analysisToOverPercentMacro =
        AnalysisViewResponseDto.overPercentMacro.builder()
                                            .overPercentCarbos(savedanalysis.getOverPercentCarbos())
                                            .overPercentProteins(savedanalysis.getOverPercentProteins())
                                            .overPercentFats(savedanalysis.getOverPercentFats()).build();
    
    AnalysisViewResponseDto analysisViewResponseDto =
        NutrientsCoders.main_project.Analysis.dto.AnalysisViewResponseDto.builder()
            .analysisId(savedanalysis.getAnalysisId())
            .weight(savedanalysis.getWeight())
            .height(savedanalysis.getHeight())
            .dailyMeal(dailyMealToDailyMealListResponseDto(savedanalysis.getDailyMeal()))
             
            .idealKcal(savedanalysis.getIdealKcal())
            .overKcal(savedanalysis.getOverKcal())
             
            .percentMacro(analysisToPercentMacro)
            .overPercentMacro(analysisToOverPercentMacro)
             
            .result(savedanalysis.getResult()).build();
    
    return analysisViewResponseDto;
  }
  
  //개별 분석용
  AnalysisResponseDto.DailyMealSimpleResponseDto dailyMealToDailyMealSimpleResponseDto(DailyMeal dailyMeal);
  
  //전체 분석용
  AnalysisViewResponseDto.DailyMealSimpleResponseDto dailyMealToDailyMealListResponseDto(DailyMeal dailyMeal);
  
  List<AnalysisViewResponseDto> analysesToAnalysisResponseDtos(List<Analysis> analyses);
}
