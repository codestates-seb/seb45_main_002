package NutrientsCoders.main_project.security.custom;

import NutrientsCoders.main_project.security.jwt.JwtTokenMaker;
import NutrientsCoders.main_project.security.jwt.MemberEntryPoint;
import NutrientsCoders.main_project.utils.AuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberFailureHandler implements AccessDeniedHandler {
    private final JwtTokenMaker jwtTokenMaker;
    private final AuthorityUtils authorityUtils;

    public MemberFailureHandler(JwtTokenMaker jwtTokenMaker, AuthorityUtils authorityUtils) {
        this.jwtTokenMaker = jwtTokenMaker;
        this.authorityUtils = authorityUtils;
    }
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        try{
            System.out.println("Error Detected!");


        }catch (ExpiredJwtException e){
            MemberEntryPoint memberEntryPoint = new MemberEntryPoint(jwtTokenMaker, authorityUtils);
            log.warn(e.getCause().getMessage());
            memberEntryPoint.ifJwtExpired(request, response);
        }

    }
}
