package com.versity.portal.versity_portal.controller;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Controller
public class JwtService {
    private final String secret = "k/g1s+hD2j4z7sA9x0B3yT6uV8wE5rF7pQ4oI2lLcM9nK0jH1iG3fE5dC4bA2Z1YwX8vU7tS6rP5oN4mZ3yX2vU1tS0rQ9pOi";
    

    private SecretKey getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String generateJwtToken(String username,Map<String,Object> extraClaims, long expiryMilis){
        return Jwts.builder()
        .claims(extraClaims)
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + expiryMilis))
        .signWith(getSignKey(),Jwts.SIG.HS256)
        .compact();
    }

    public Map<String, Object> extractAllClaim(String token){
        return Jwts.parser()
        .verifyWith(getSignKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    }


    public String extractUserID(String token){
        return (String)extractAllClaim(token).get("sub");
    }

    public String extractDepartment(String token){
        return (String)extractAllClaim(token).get("dept");
    }

    public String extractSemester(String token){
        return (String)extractAllClaim(token).get("sem");
    }

    public Object extractRole(String token){
        return extractAllClaim(token).get("roles");
    } 

    public String extractName(String token){
        return extractAllClaim(token).get("name").toString();
    }


    public boolean isTokenExpired(String token){
        Number exp = (Number) extractAllClaim(token).get("exp");
        Date expiration = new Date(exp.longValue() * 1000);
        return expiration.before(new Date());
    }

    public boolean validateToken(String token,String username){
        try {
            String extractedUsername =  extractUserID(token);
            return (extractedUsername.equals(username) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
} 