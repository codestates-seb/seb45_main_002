package NutrientsCoders.main_project.utils;

import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.repository.MemberRepository;
import NutrientsCoders.main_project.security.jwt.JwtTokenMaker;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;

@Component
@Slf4j
public class TokenChanger {
    private final JwtTokenMaker jwtTokenMaker;
    private final AuthorityUtils authorityUtils;

    private final MemberRepository memberRepository;

    @Value("${jwt.key}")
    private String secret;

    public TokenChanger(JwtTokenMaker jwtTokenMaker,AuthorityUtils authorityUtils,MemberRepository memberRepository) {
        this.jwtTokenMaker = jwtTokenMaker;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
    }

    public Long getMemberId(String token){
        String AccessTokenChange = token.substring(15);


        Claims claims = jwtTokenMaker.getClaims(AccessTokenChange,secret).getBody();

        Long memberId = Long.parseLong(claims.get("memberId").toString());

        return memberId;


    }

    public List<String> getRefresh(String access,String refresh){
        String AccessTokenChange = access.substring(15);
        try {
            Key key = getKeyEncoded(secret);

            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(AccessTokenChange);

            List<String> Tokens = new ArrayList<>();
            Tokens.add(access);
            Tokens.add(refresh);

            return Tokens;
        }catch (ExpiredJwtException e){

            String base64EncodedSecretKey = jwtTokenMaker.encodeBase64SecretKey(jwtTokenMaker.getSecret());

            jwtTokenMaker.verifySignature(refresh, base64EncodedSecretKey);


            Map<String, Object> RefreshClaims = jwtTokenMaker.getClaims(refresh,secret).getBody();
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

            String RefreshToken = jwtTokenMaker.generateRefreshToken(email,
                    jwtTokenMaker.getTokenExpiration(jwtTokenMaker.getRefreshExpiration()),
                    base64EncodedSecretKey);


            //새로운 액세스 토큰 응답 헤더에 담아 전송
            List<String> Tokens = new ArrayList<>();
            Tokens.add(AccessToken);
            Tokens.add(RefreshToken);

            return Tokens;
        }


    }
    private Key getKeyEncoded(String secret) {
        byte[] keyBytes = new byte[32];

        return Keys.hmacShaKeyFor(keyBytes);
    }
}
