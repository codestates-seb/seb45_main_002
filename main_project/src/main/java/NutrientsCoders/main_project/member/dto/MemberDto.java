package NutrientsCoders.main_project.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class email{
        private String email;
        private String test;
    }

    @Getter
    @AllArgsConstructor
    public static class Login{
        private String email;
        private String password;

    }

    @Getter
    @AllArgsConstructor
    public static class AddInfo{
        private Long memberId;
        private Integer height;
        private Integer weight;
        private Integer age;
        private String gender;
        private Float activity;
    }

    @Getter
    @AllArgsConstructor
    public static class Post{
        private String nickname;
        private String email;
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch{
        private String nickname;
        private Integer height;
        private Integer weight;
        private Integer age;
        private String gender;
        private Float activity;
        private String imageUrl;
    }


}
