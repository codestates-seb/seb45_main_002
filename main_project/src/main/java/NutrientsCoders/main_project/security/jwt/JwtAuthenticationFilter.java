package NutrientsCoders.main_project.security.jwt;

import NutrientsCoders.main_project.member.dto.MemberDto;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.security.custom.LoginDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authManager;
    private final JwtTokenMaker jwtmaker;

    public JwtAuthenticationFilter(AuthenticationManager authManager, JwtTokenMaker jwtmaker) {
        this.authManager = authManager;
        this.jwtmaker = jwtmaker;
    }


    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();

        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);


        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),loginDto.getPassword()
                );

        return authManager.authenticate(authenticationToken);

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();  //  Member 엔티티 클래스의 객체를 얻기

        String accessToken = delegateAccessToken(member);   // Access Token을 생성
        String refreshToken = delegateRefreshToken(member); // Refresh Token을 생성

        response.setHeader("Authorization","SecurityBearer "+ accessToken);  // 클라이언트 측의 자격을 증명
        response.setHeader("Refresh", refreshToken);                   // Access Token을 새로 발급받기 위해 클라이언트에게 추가적으로 제공

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult); //성공 시 호출
    }

    // AccessToken 발급 과정 (유저 정보 대입)
    private String delegateAccessToken(Member member) { //email대신 id, 닉네임,유저 권한 대입
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId",member.getMemberId());
        claims.put("username", member.getNickname());
        claims.put("roles", member.getRoles());

        String subject = member.getNickname();
        Date expiration = jwtmaker.getTokenExpiration(jwtmaker.getAccessExpiration());

        String base64EncodedSecretKey = jwtmaker.encodeBase64SecretKey(jwtmaker.getSecret());

        return jwtmaker.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    // RefreshToken 발급 과정
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtmaker.getTokenExpiration(jwtmaker.getRefreshExpiration());
        String base64EncodedSecretKey = jwtmaker.encodeBase64SecretKey(jwtmaker.getSecret());

        return jwtmaker.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }


}
