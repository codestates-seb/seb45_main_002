package NutrientsCoders.main_project.Analysis.mapper;

import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.Analysis.entity.Analysis;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import org.mapstruct.Mapper;

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
            .dailyMeal(dailyMealToDailyMealSimpleResponseDto(savedanalysis.getDailyMeal()))
            .idealKacl(savedanalysis.getIdealKacl())
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
  
  AnalysisResponseDto.DailyMealSimpleResponseDto dailyMealToDailyMealSimpleResponseDto(DailyMeal dailyMeal);
}
