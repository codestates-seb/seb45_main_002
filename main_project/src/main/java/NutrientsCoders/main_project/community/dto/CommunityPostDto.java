package NutrientsCoders.main_project.community.dto;

import NutrientsCoders.main_project.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityPostDto {
    private Long memberId;
    private String communityTitle;
    private String communityContent;
    public Member getMember(){
        Member member =new Member();
        member.setMemberId(memberId);
        return member;
    }
}
