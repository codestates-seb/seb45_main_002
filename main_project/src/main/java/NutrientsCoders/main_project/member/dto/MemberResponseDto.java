package NutrientsCoders.main_project.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class MemberResponseDto {

    @Getter
    @AllArgsConstructor
    public static class MyPage{
        private String email;
        private String nickname;
        private Integer height;
        private Integer weight;
        private String gender;
        private Integer age;
        private Float activity;
        private Float bmi;
        private Float needKcal;
        private String imageUrl;
        private LocalDateTime createdAt;
        private List<String> avoid;
    }

    @Getter@Setter
    @AllArgsConstructor
    public static class bmi{
        private Float bmi;
        private Float kcal;
    }

    @Getter
    @AllArgsConstructor
    public static class loginNext{
        private String email;
    }
}
