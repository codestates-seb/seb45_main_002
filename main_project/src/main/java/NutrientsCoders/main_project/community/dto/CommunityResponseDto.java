package NutrientsCoders.main_project.community.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityResponseDto {
    private Long communityId;
    private Long memberId;
    private String communityTitle;
    private String communityContent;
    private long recommendationCount;
    private long communityViewCount;
    private LocalDateTime community_createdAt;
    private LocalDateTime community_modifiedAt;
}
