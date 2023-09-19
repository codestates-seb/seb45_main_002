package NutrientsCoders.main_project.utils;

import NutrientsCoders.main_project.security.jwt.JwtTokenMaker;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TokenChanger {
    private final JwtTokenMaker jwtTokenMaker;

    @Value("${jwt.key}")
    private String secret;

    public TokenChanger(JwtTokenMaker jwtTokenMaker) {
        this.jwtTokenMaker = jwtTokenMaker;
    }

    public Long getMemberId(String token){
        String AccessTokenChange = token.substring(15);


        Claims claims = jwtTokenMaker.getClaims(AccessTokenChange,secret).getBody();

        Long memberId = Long.parseLong(claims.get("memberId").toString());

        return memberId;


    }
}
