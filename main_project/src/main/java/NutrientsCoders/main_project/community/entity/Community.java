package NutrientsCoders.main_project.community.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Community extends CommunityBaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;
    @Column
    private String communityTitle;
    @Column(columnDefinition = "TEXT")
    private String communityContent;
    @Column
    private Long recommendationCount=0L;

}
