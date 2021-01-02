package devanmejia.configuration.security.jwt;

import devanmejia.models.RefreshTokens;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

@Component
public class JWTProvider {
    @Value("${jwt.token.secret}")
    private String secretKey;
    @Value("${jwt.token.expired}")
    private Long timeValidation;
    @Qualifier("JWTUserDetailsService")
    @Autowired
    private UserDetailsService userDetailsService;


    public String createToken(String userName){
        Claims claims = Jwts.claims().setSubject(userName);

        Date currentDate = new Date();
        Date validationTime = new Date(currentDate.getTime()+timeValidation);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currentDate)
                .setExpiration(validationTime)
                .signWith(SignatureAlgorithm.HS256, secretKey).compact();
    }
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public Authentication getAuthentication(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUserName(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());

    }
    public String getUserName(HttpServletRequest request){
        return getUserName(resolveToken(request));
    }
    public String getUserName(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer_")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    public boolean validate(String token){
        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            if(claims.getBody().getExpiration().before(new Date()))
                return false;
            return true;
        }catch(JwtException | IllegalArgumentException e){
            System.err.println("JWT is expired or invalid "+ e.getMessage());
            throw new JWTAuthenticationException("JWT is expired or invalid "+ e.getMessage());
        }
    }

}
