package NutrientsCoders.main_project.community.entity;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
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
    private boolean communityLike = true;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID",nullable = false)
    private Member member;
    public void setMember(Member member) {
        this.member = member;
    }
    @OneToMany(mappedBy = "community",cascade = CascadeType.REMOVE)
    private List<CommunityComment> communityCommentList = new ArrayList<>();
    /** 게시판을 조회하면 viewCount 증가 **/
    public long incrementViewCount(){
        return ++communityViewCount;
    }
    /** like가 true이면 recommendationCount 증가 **/
    public long incrementRecommendationCount(){
        return ++recommendationCount;
    }
    /** like가 false이면 recommendationCount 감소 **/
    public long decrementRecommendationCount(){
        return --recommendationCount;
    }

}
