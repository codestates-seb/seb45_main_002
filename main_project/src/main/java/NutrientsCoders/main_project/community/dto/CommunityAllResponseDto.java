package NutrientsCoders.main_project.community.dto;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommunityAllResponseDto {
    private Long communityId;
    private String communityTitle;
    private String communityContent;
    private long recommendationCount;
    private long communityViewCount;
    private LocalDateTime community_createdAt;
    private LocalDateTime community_modifiedAt;
    private List<CommunityComment> communityCommentList;
}
