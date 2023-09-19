package NutrientsCoders.main_project.security;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CorsResolver implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .allowedOrigins("http://43.201.194.176:8080",
                        "http://nutrients-coders.com.s3-website.ap-northeast-2.amazonaws.com",
                        "http://www.nutrients-coders.com.s3-website.ap-northeast-2.amazonaws.com",
                        "http://mainproj.s3-website.ap-northeast-2.amazonaws.com",
                        "http://localhost:3000","http://localhost:8080")
                .allowedHeaders("*")
                .allowedMethods("*");
    }
}
