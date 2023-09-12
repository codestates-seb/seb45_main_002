package NutrientsCoders.main_project.communitycomment.dto;

import NutrientsCoders.main_project.community.entity.Community;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityCommentPostDto {
    private Long communityId;
    private String communityCommentContent;
    public Community getCommunity(){
        Community community = new Community();
        community.setCommunityId(communityId);
        return community;
    }
}
