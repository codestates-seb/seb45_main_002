package NutrientsCoders.main_project.member.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MEMBER_ID")
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column
    private String password;

    @Column(nullable = false)
    private String nickname;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Column
    private String gender;

    @Column
    private Integer height;

    @Column
    private Integer weight;

    @Column
    private Integer age;

    @Column
    private Float activity;

    @Column
    private Float needKcal;

    @Column
    private Float bmi;
    //@OneToMany(mappedBy = "food")
    //private List<food> avoid = new ArrayList<>();
    @Column
    private String imageUrl;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Member(String email) {
        this.email = email;
    }
}
