package NutrientsCoders.main_project.communitycomment.entity;

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

}
