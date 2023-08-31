package NutrientsCoders.main_project.community.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityResponseDto {
    private Long communityId;
    private String communityTitle;
    private String communityContent;
    private Long recommendationCount;
    private LocalDateTime answerComment_createdAt;
    private LocalDateTime answerComment_modifiedAt;
}
