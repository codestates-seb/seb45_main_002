package NutrientsCoders.main_project.Analysis.mapper;

import NutrientsCoders.main_project.Analysis.dto.AnalysisResponseDto;
import NutrientsCoders.main_project.Analysis.entity.Analysis;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnalysisMapper {
  AnalysisResponseDto analysisToAnalysisResponseDto(Analysis savedanalysis);
}
