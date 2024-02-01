package com.simple.simpleboard.api.jwttoken;


import com.simple.simpleboard.api.request.UserRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private static final Long ACCESS_TIME = 60 * 1000L;
    private static final Long REFRESH_TIME = 2 * 60 * 1000L;
    public static final String ACCESS_TOKEN = "Access_Token";
    public static final String REFERSH_TOKEN = "Refersh_Token";
    private static final String SECRET_KEY = "happilyeverafterhappilyeverafterdasgsadgasdgsadgasdgsdag";
    
    private String secretKey = SECRET_KEY;
    private Key key;

    private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    @PostConstruct
    public void init() {
        byte[] bytes = Base64.getDecoder().decode(secretKey);
        key = Keys.hmacShaKeyFor(bytes);
    }

    public TokenDto createAllToken(UserRequest.UserInfo user){
        return new TokenDto(createToken(user, "Access"), createToken(user, "Refresh"));
    }

    public String createToken(UserRequest.UserInfo user, String type){
        Date date = new Date();

        Long time = type.equals("Access") ? ACCESS_TIME : REFRESH_TIME;

        return Jwts.builder()
                .setSubject(user.getUserId())
                .claim("userIdx", user.getUserIdx())
                .setExpiration(new Date(date.getTime() + time))
                .setIssuedAt(date)
                .signWith(key, signatureAlgorithm)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = tokenParser(token);

//        Collection<? extends GrantedAuthority> userIdx =
//                (Collection<? extends GrantedAuthority>) claims.get("userIdx");

//        if(claims.get("userIdx") );

//        CustomUserDetails userInfo = new CustomUserDetails();
//        userInfo.setUserIdx((Integer) claims.get("userIdx"));

//        return new UsernamePasswordAuthenticationToken(userInfo, token, authorite);

        return null;
    }

    public boolean validateToken(String jwtToken) {
        try {

            Jwts.parser().setSigningKey(key).parseClaimsJws(jwtToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException e) {
            return false;
        }
    }

    public Claims tokenParser(String token){
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }
//
//    public int getUserIdx() {
//        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        return user.getUserIdx();
//    }
}
