package NutrientsCoders.main_project.security;

import NutrientsCoders.main_project.security.jwt.JwtAuthenticationFilter;
import NutrientsCoders.main_project.security.jwt.JwtTokenMaker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private final JwtTokenMaker tokenMaker;

    public SecurityConfig(JwtTokenMaker tokenMaker) {
        this.tokenMaker = tokenMaker;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http

                .headers().frameOptions().sameOrigin()// h2 콘솔 db 내용 허용
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 안씀
                .and()
                .formLogin().disable()
                .httpBasic().disable()//postman 요청 허용
                .apply(new CustomFilterConfig())
                .and()
                .authorizeRequests()
                .antMatchers("/h2/**").permitAll()
                //.anyRequest().authenticated() //다른 요청은 인증 필요함
                .and()

        ;


        return http.build();

    }

    @Bean // 비밀번호 인코딩을 위함
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://d9f8-14-37-234-174.ngrok-free.app","http://localhost:8080","http://localhost:3000")); //로컬환경 + npm 환경
        configuration.setAllowedMethods(Arrays.asList("GET","PATCH","DELETE","POST","OPTIONS")); //+options
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization","Refresh"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    public class CustomFilterConfig extends AbstractHttpConfigurer<CustomFilterConfig, HttpSecurity> {


        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // JwtAuthenticationFilter에서 사용되는 AuthenticationManager와 JwtTokenizer를 DI
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, tokenMaker);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");

            // JwtVerificationFilter의 인스턴스를 생성 및 사용되는 객체들을 생성자로 DI
            // JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            // JwtAuthenticationFilter를 Spring Security Filter Chain에 추가
            builder.addFilter(jwtAuthenticationFilter);
            //JwtVerificationFilter를 JwtAuthenticationFilter 뒤에 추가
            //-> 위에 인증에 성공한 후 발급받은 JWT가 클라이언트의 request header(Authorization 헤더)에 포함되어 있을 경우에만 동작
            //.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

}

