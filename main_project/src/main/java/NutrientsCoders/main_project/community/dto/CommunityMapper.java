package NutrientsCoders.main_project.community.dto;

import NutrientsCoders.main_project.community.entity.Community;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommunityMapper {
    Community communityPostDtoToCommunity(CommunityPostDto communityPostDto);
    CommunityResponseDto communityToCommunityResponseDto(Community community);
}
