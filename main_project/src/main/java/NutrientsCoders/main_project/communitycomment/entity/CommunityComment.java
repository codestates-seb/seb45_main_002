package NutrientsCoders.main_project.communitycomment.entity;

import NutrientsCoders.main_project.community.entity.Community;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CommunityComment extends CommunityCommentBaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityCommentId;
    @Column(columnDefinition = "text")
    @NotNull
    private String communityCommentContent;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "COMMUNITY_ID",nullable = false)
    private Community community;

    /** 커뮤니티 아이디 설정 **/
    public void setCommunity(Community community){
        this.community = community;
    }
}
