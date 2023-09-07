package NutrientsCoders.main_project.security.jwt;

import NutrientsCoders.main_project.utils.AuthorityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.annotation.Target;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenMaker jwtTokenMaker;
    private final AuthorityUtils authorityUtils;

    // JwtTokenMaker-> JWT를 검증하고 Claims(토큰에 포함된 정보)를 얻는 데 사용
    // Custom AuthorityUtils-> JWT 검증에 성공하면 Authentication 객체에 채울 사용자의 권한을 생성
    public JwtVerificationFilter(JwtTokenMaker jwtTokenMaker,
                                 AuthorityUtils authorityUtils) {
        this.jwtTokenMaker = jwtTokenMaker;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Map<String, Object> claims = verifyJws(request); // 1차 검증
        setAuthenticationToContext(claims);      // SecurityContext에 저장 하기 위함

        filterChain.doFilter(request, response);

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException { //jwt 1차 유효 검증 (값이 비어있거나 스티커 없으면 무효)
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("SecurityBearer");
    }


    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("SecurityBearer ", ""); // header에서 Authorization 라고 되어있는거 가져옴 + 1차 토큰 검증
        String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

        return jwtTokenMaker.getClaims(jws, base64EncodedSecretKey).getBody();   // parsing
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        //Principal
        Object username = claims.get("username");   // 유저 닉네임 가져오기

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
}
