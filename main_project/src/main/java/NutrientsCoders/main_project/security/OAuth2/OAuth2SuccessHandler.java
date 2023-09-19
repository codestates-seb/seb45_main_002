package NutrientsCoders.main_project.security.OAuth2;

import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.security.jwt.JwtTokenMaker;
import NutrientsCoders.main_project.utils.AuthorityUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenMaker tokenMaker;
    private final AuthorityUtils authorityUtils;

    private final MemberService memberService;

    public OAuth2SuccessHandler(JwtTokenMaker tokenMaker, AuthorityUtils authorityUtils, @Lazy MemberService memberService) {
        this.tokenMaker = tokenMaker;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String name = (String) oAuth2User.getAttributes().get("name");
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String image = (String) oAuth2User.getAttributes().get("picture");
        if (image == null) {
            image = (String) oAuth2User.getAttributes().get("profile_image");
        }

        List<String> authorities = authorityUtils.createRoles(email);

        Member member = Member.builder()
                .nickname(name)
                .email(email)
                .imageUrl(image)
                .build();

        if(memberService.findMember(member.getEmail())==null) {
            Member savedMember = memberService.createOAuth2Member(member);
            redirect(request, response, savedMember, authorities);
        } else {
            Member findMember = memberService.findMember(member.getEmail());
            redirect(request, response, findMember, authorities);
        }


    }


    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(member, authorities);
        String refreshToken = delegateRefreshToken(member.getEmail());

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Member member, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId",member.getMemberId());
        claims.put("username", member.getNickname());
        claims.put("roles", authorities);

        String subject = member.getNickname();
        Date expiration = tokenMaker.getTokenExpiration(tokenMaker.getAccessExpiration());

        String base64EncodedSecretKey = tokenMaker.encodeBase64SecretKey(tokenMaker.getSecret());

        String accessToken = tokenMaker.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = tokenMaker.getTokenExpiration(tokenMaker.getRefreshExpiration());
        String base64EncodedSecretKey = tokenMaker.encodeBase64SecretKey(tokenMaker.getSecret());

        String refreshToken = tokenMaker.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token","SecurityBearer " + accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("http://nutrients.com.s3-website.ap-northeast-2.amazonaws.com")
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }



}
