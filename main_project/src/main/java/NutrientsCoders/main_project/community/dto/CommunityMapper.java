package NutrientsCoders.main_project.community.dto;

import NutrientsCoders.main_project.community.entity.Community;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {
    Community communityPostDtoToCommunity(CommunityPostDto communityPostDto);
    Community communityPatchDtoToCommunity(CommunityPatchDto communityPatchDto);
    CommunityResponseDto communityToCommunityResponseDto(Community community);
    CommunityAllResponseDto communityToCommunityAllResponseDto(Community community); //모든 값 null 문제는 default로 변경하여 값을 하나하나 넣어주거나, 다른 경우 살펴봐야 할듯
    List<Community> communityToCommunityResponseDtos(List<Community> community);
}
