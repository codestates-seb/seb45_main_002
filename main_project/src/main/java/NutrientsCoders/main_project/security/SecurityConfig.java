package NutrientsCoders.main_project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .antMatcher("/h2/**")// h2로 된 주소
                .authorizeRequests()
                .anyRequest().permitAll() //요청 전부 허용
                .and()
                .csrf().disable()
                .headers().frameOptions().disable()// h2 콘솔 db 내용 허용
                .and()
                .httpBasic();//postman 요청 허용

        return http.build();

    }

    @Bean // 비밀번호 인코딩을 위함
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
