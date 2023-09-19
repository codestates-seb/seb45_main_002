package NutrientsCoders.main_project.security.jwt;

import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.repository.MemberRepository;
import NutrientsCoders.main_project.utils.AuthorityUtils;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import io.jsonwebtoken.ExpiredJwtException;
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
import java.util.*;

public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenMaker jwtTokenMaker;
    private final AuthorityUtils authorityUtils;

    private final MemberRepository memberRepository;

    // JwtTokenMaker-> JWT를 검증하고 Claims(토큰에 포함된 정보)를 얻는 데 사용
    // Custom AuthorityUtils-> JWT 검증에 성공하면 Authentication 객체에 채울 사용자의 권한을 생성
    public JwtVerificationFilter(JwtTokenMaker jwtTokenMaker,
                                 AuthorityUtils authorityUtils,
                                 MemberRepository memberRepository) {
        this.jwtTokenMaker = jwtTokenMaker;
        this.authorityUtils = authorityUtils;
        this.memberRepository=memberRepository;
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
        try {
            String jws = request.getHeader("Authorization").replace("SecurityBearer ", ""); // header에서 Authorization 라고 되어있는거 가져옴 + 1차 토큰 검증

            String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

            return jwtTokenMaker.getClaims(jws, base64EncodedSecretKey).getBody();   // parsing
        }catch (ExpiredJwtException e){
            try {


                System.out.println("======Refresh!======");
                String refreshToken = request.getHeader("Refresh");
                String newAccessToken = generateNewAccess(refreshToken);
                return jwtTokenMaker.getClaims(newAccessToken, jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret())).getBody();   // parsing
            }catch (IllegalArgumentException e2){
                System.out.println("Where is the Refresh Token?");
                return null;
            }
            }
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        try {


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
        }catch (NullPointerException e){

            StackTraceElement[] stackTrace = e.getStackTrace();
            if (stackTrace.length > 0) {
                StackTraceElement firstElement = stackTrace[0];
                String fileName = firstElement.getFileName();
                System.out.println(fileName);
                if (Objects.equals(fileName, "JwtVerificationFilter.java")){

                    //throw new LogicException(ExceptionCode.NEED_REFRESH_TOKEN);
                }
            }

        }
    }

    private String generateNewAccess(String refresh){

        String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

        jwtTokenMaker.verifySignature(refresh, base64EncodedSecretKey);


        Map<String, Object> RefreshClaims = jwtTokenMaker.getClaims(refresh,jwtTokenMaker.getSecret()).getBody();
        String email =(String) RefreshClaims.get("sub");
        Member member = memberRepository.findByEmail(email);


        Map<String, Object> newClaims = new HashMap<>();
        String username = member.getNickname();
        List<String> roles = member.getRoles();
        newClaims.put("username", username);
        newClaims.put("roles", roles);
        newClaims.put("memberId",member.getMemberId());


        Date expiration = jwtTokenMaker.getTokenExpiration(jwtTokenMaker.getAccessExpiration());
        String AccessToken = jwtTokenMaker.generateAccessToken(newClaims, username, expiration, base64EncodedSecretKey);


        return AccessToken;
    }
}
