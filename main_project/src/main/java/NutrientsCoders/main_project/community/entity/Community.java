package NutrientsCoders.main_project.community.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
