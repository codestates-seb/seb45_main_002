package NutrientsCoders.main_project.community.entity;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.dailymeal.entity.DailyMeal;
import NutrientsCoders.main_project.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column
    private Integer communityCommentCount;
    @ElementCollection
    @CollectionTable(name = "MEMBER_ID", joinColumns = @JoinColumn(name = "member_Id"))
    @Column(name = "LIKE_MEMBERS",insertable = false)
    private List<Long> likeMembers;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "DAILYMEAL_ID", nullable = true)
    private DailyMeal dailyMeal;
//    @ManyToOne
//    @JoinColumn(name = "ANALYSIS_ID")
//    private Analysis analysis;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID",nullable = false)
    private Member member;
    public void setMember(Member member) {
        this.member = member;
    }
    @OneToMany(mappedBy = "community")
    private List<CommunityComment> communityCommentList = new ArrayList<>();
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
    /** 멤버가 추천 했는지 확인 **/
    public boolean isMemberId(long memberId){
        for (int i = 0; i < likeMembers.size(); i++) {
            if(likeMembers.get(i) == memberId){ return true;}
        }
        return false;
    }
    /** 추천한 멤버리스트에 멤버 추가 **/
    public void addMembers(long memberId){
        likeMembers.add(memberId);
    }
}


