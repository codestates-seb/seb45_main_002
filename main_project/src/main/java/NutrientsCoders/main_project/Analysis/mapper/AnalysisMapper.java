package NutrientsCoders.main_project.Analysis.mapper;

import NutrientsCoders.main_project.Analysis.dto.AnalysisDto;
import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.dailymeal.entity.Analysis;

public interface AnalysisMapper {
  Analysis analysisDtoToAnalysis(AnalysisDto analysisDto);
  
  AnalysisResponseDto analysisToAnalysisResponseDto(Analysis savedanalysis);
}
