package NutrientsCoders.main_project.security;

import NutrientsCoders.main_project.member.repository.MemberRepository;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.security.OAuth2.OAuth2SuccessHandler;

import NutrientsCoders.main_project.security.custom.LoginSuccessHandler;
import NutrientsCoders.main_project.security.jwt.JwtAuthenticationFilter;
import NutrientsCoders.main_project.security.jwt.JwtTokenMaker;
import NutrientsCoders.main_project.security.jwt.JwtVerificationFilter;
import NutrientsCoders.main_project.utils.AuthorityUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import java.util.List;


@Configuration
public class SecurityConfig {

    private final JwtTokenMaker tokenMaker;
    private final AuthorityUtils authorityUtils; //Custom

    private final MemberService memberService;

    public SecurityConfig(JwtTokenMaker tokenMaker,
                          AuthorityUtils authorityUtils,
                          @Lazy MemberService memberService) {
        this.tokenMaker = tokenMaker;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }


    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String clientSecret;

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
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/main").permitAll()

                        .antMatchers(HttpMethod.POST, "/login/**").permitAll()

                        .antMatchers(HttpMethod.PATCH, "/mypage/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/mypage/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/mypage/**").hasRole("USER")

                        .antMatchers(HttpMethod.POST, "/member/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/member/**").hasRole("USER")



                        .anyRequest().permitAll()
                )

                .oauth2Login(oauth2 ->
                        oauth2.successHandler(new OAuth2SuccessHandler(tokenMaker,authorityUtils,memberService)))

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
        configuration.setAllowedOrigins(Arrays.asList("http://43.201.194.176:8080","http://mainproj.s3-website.ap-northeast-2.amazonaws.com","http://localhost:3000","http://localhost:8080"));
        configuration.setAllowedMethods(Arrays.asList("GET","PATCH","DELETE","POST","OPTIONS")); //+options
        configuration.setAllowedHeaders(List.of("*"));
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

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new LoginSuccessHandler());

            // JwtVerificationFilter의 인스턴스를 생성 및 사용되는 객체들을 생성자로 DI
             JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(tokenMaker, authorityUtils);

            // JwtAuthenticationFilter를 Spring Security Filter Chain에 추가
            builder.addFilter(jwtAuthenticationFilter)
            //JwtVerificationFilter를 JwtAuthenticationFilter 뒤에 추가
            .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
            //oauth2 로그인 활용
            .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class)

            ;
        }
    }
    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        var clientRegistration = clientRegistration();

        return new InMemoryClientRegistrationRepository(clientRegistration);
    }


    private ClientRegistration clientRegistration() {

        return CommonOAuth2Provider
                .GOOGLE
                .getBuilder("google")
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
    }
}



