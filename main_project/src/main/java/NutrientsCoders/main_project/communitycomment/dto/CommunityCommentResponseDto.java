package NutrientsCoders.main_project.communitycomment.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityCommentResponseDto {
    private Long communityId;
    private Long communityCommentId;
    private String communityCommentContent;
    private LocalDateTime answerComment_createdAt;
    private LocalDateTime answerComment_modifiedAt;
    private String nickname;
}

