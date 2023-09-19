package NutrientsCoders.main_project.security.jwt;

import NutrientsCoders.main_project.utils.AuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@Slf4j
@Component
public class MemberEntryPoint implements AuthenticationEntryPoint {
    private final JwtTokenMaker jwtTokenMaker;

    private final AuthorityUtils authorityUtils;

    public MemberEntryPoint(JwtTokenMaker jwtTokenMaker, AuthorityUtils authorityUtils) {
        this.jwtTokenMaker = jwtTokenMaker;
        this.authorityUtils = authorityUtils;
    }


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        System.out.println("hi");
        if (authException.getCause() instanceof ExpiredJwtException){
            ifJwtExpired(request,response);
        }
        try {
            String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

            jwtTokenMaker.verifySignature(request.getHeader("Authorization").replace("SecurityBearer ", ""), base64EncodedSecretKey);

            if (authException.getCause() instanceof ExpiredJwtException){
                ifJwtExpired(request,response);
            }
        }catch (ExpiredJwtException expiredJwtException){
            log.warn(expiredJwtException.getMessage());
            ifJwtExpired(request,response);
        }


    }

    public void ifJwtExpired(HttpServletRequest request, HttpServletResponse response){
            String refreshToken = request.getHeader("Refresh");

            String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

            jwtTokenMaker.verifySignature(refreshToken, base64EncodedSecretKey);

            Map<String, Object> claims = takeAccess(request);
            Map<String, Object> newClaims = new HashMap<>();
            String username = (String) claims.get("sub");
            List<String> roles = authorityUtils.createRoles(username);
            newClaims.put("username", username);
            newClaims.put("roles", roles);
            newClaims.put("memberId",claims.get("memberId"));


            Date expiration = jwtTokenMaker.getTokenExpiration(jwtTokenMaker.getAccessExpiration());
            String AccessToken = jwtTokenMaker.generateAccessToken(newClaims, username, expiration, base64EncodedSecretKey);
            String RefreshToken = jwtTokenMaker.generateRefreshToken(username,
                    jwtTokenMaker.getTokenExpiration(jwtTokenMaker.getRefreshExpiration()),
                    base64EncodedSecretKey);

            setAuthenticationToContext(newClaims);

            //새로운 액세스 토큰 응답 헤더에 담아 전송

            response.setHeader("Authorization", AccessToken);
            response.setHeader("Refresh", RefreshToken);

    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        //Principal
        Object username = claims.get("username");

        //Credentials
        Object password = claims.get("memberId"); //credentials 임시로 id


        //Collection<GrantedAuthority>
        List<String> roles = new ArrayList<>();
        ArrayList<?> rolesClaim = (ArrayList<?>) claims.get("roles");
        for (Object role : rolesClaim) {
            if (role instanceof String) {
                roles.add((String) role);
            }
        }

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(roles);  // 유저 권한 가져오기
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication); // ScurityContext 저장
    }

    private Map<String, Object> takeAccess(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("SecurityBearer ", ""); // header에서 Authorization 라고 되어있는거 가져옴 + 1차 토큰 검증

        String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

        return jwtTokenMaker.getClaims(jws, base64EncodedSecretKey).getBody();   // parsing
    }

}
