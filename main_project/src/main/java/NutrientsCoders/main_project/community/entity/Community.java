package NutrientsCoders.main_project.community.entity;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Community extends CommunityBaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;
    @Column
    @NotNull
    private String communityTitle;
    @Column(columnDefinition = "TEXT")
    @NotNull
    private String communityContent;
    @Column
    private long recommendationCount = 0L;
    @Column
    private long communityViewCount = 0L;
    @Column
    private int communityLike = 0;
    @ElementCollection
    @CollectionTable(name = "MEMBER_ID", joinColumns = @JoinColumn(name = "member_Id"))
    @Column(name = "members",insertable = false)
    private List<Long> members;
    public void addMembers(long memberId){
        members.add(memberId);
    }
    @ManyToOne
    @JoinColumn(name = "DAILYMEAL_ID", nullable = true)
    private DailyMeal dailyMeal;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID",nullable = false)
    private Member member;
    public void setMember(Member member) {
        this.member = member;
    }
    @OneToMany(mappedBy = "community")
    private List<CommunityComment> communityCommentList = new ArrayList<>();
//    @OneToMany(mappedBy = "community")
//    private List<CommunityMember> communityMemeberList = new ArrayList<>();
    /** 게시판을 조회하면 viewCount 증가 **/
    public long incrementViewCount(){
        return ++communityViewCount;
    }
    /** like가 0이면 recommendationCount 증가 **/
    public long incrementRecommendationCount(){
        return ++recommendationCount;
    }
    /** like가 1이면 recommendationCount 감소 **/
    public long decrementRecommendationCount(){
        return --recommendationCount;
    }
    public boolean isMemberId(long memberId){
        for (int i = 0; i < members.size(); i++) {
            if(members.get(i) == memberId){ return true;}
        }
        return false;
    }
}


