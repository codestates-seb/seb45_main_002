package NutrientsCoders.main_project.communitycomment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityCommentPostDto {
    private Long communityId;
    private String communityCommentContent;
}
