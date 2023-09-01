package NutrientsCoders.main_project.communitycomment.dto;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommunityCommentMapper {
    CommunityComment communityCommentPostDtoToComment(CommunityCommentPostDto communityCommentPostDto);
    CommunityCommentResponseDto communityCommentResponseDtoToComment(CommunityComment communityComment);
}
