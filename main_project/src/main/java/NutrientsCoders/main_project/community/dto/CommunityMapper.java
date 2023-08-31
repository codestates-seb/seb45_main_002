package NutrientsCoders.main_project.community.dto;

import NutrientsCoders.main_project.community.entity.Community;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {
    Community communityPostDtoToCommunity(CommunityPostDto communityPostDto);
    Community communityPatchDtoToCommunity(CommunityPatchDto communityPatchDto);
    CommunityResponseDto communityToCommunityResponseDto(Community community);
    List<Community> communityToCommunityResponseDtos(List<Community> community);
}
