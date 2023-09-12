package NutrientsCoders.main_project.community.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityPostDto {
    private Long memberId;
    private String communityTitle;
    private String communityContent;
}
