package com.ecomarket.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

  private final Key signingKey;
  private final long expirationMs;

  public JwtService(
      @Value("${app.security.jwt.secret}") String secret,
      @Value("${app.security.jwt.expiration-ms}") long expirationMs) {

    this.signingKey = Keys.hmacShaKeyFor(secret.getBytes());
    this.expirationMs = expirationMs;
  }

  // Extrae el "email" del subject
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  // Para extraer cualquier campo del token
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    Claims claims = Jwts.parserBuilder()
        .setSigningKey(signingKey)
        .build()
        .parseClaimsJws(token)
        .getBody();

    return claimsResolver.apply(claims);
  }

  // Genera token sin claims extra
  public String generateToken(UserDetails userDetails) {
    return generateToken(Map.of(), userDetails);
  }

  // Genera token con claims extra (si quieres agregar rol después)
  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + expirationMs);

    return Jwts.builder()
        .setClaims(extraClaims)
        .setSubject(userDetails.getUsername()) // email
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(signingKey, SignatureAlgorithm.HS256)
        .compact();
  }

  // Valida el token
  public boolean isTokenValid(String token, UserDetails userDetails) {
    String email = extractUsername(token);
    return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  // Verifica expiración
  private boolean isTokenExpired(String token) {
    Date exp = extractClaim(token, Claims::getExpiration);
    return exp.before(new Date());
  }

}
