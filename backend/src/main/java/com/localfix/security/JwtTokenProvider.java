package com.localfix.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
    private static final String DEV_KEY_MARKER = "dev-only-insecure-key";

    @Value("${localfix.jwt.secret}")
    private String jwtSecret;

    @Value("${localfix.jwt.expiration-ms}")
    private long jwtExpirationMs;

    /**
     * HS256 needs at least 256 bits of key material. Failing here at boot is far
     * better than failing per-request later, and the warning makes it obvious
     * when a deployment is still running on the checked-in development key.
     */
    @PostConstruct
    void validateSecret() {
        if (jwtSecret == null || jwtSecret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException(
                    "localfix.jwt.secret must be at least 32 characters. Set LOCALFIX_JWT_SECRET.");
        }
        if (jwtSecret.contains(DEV_KEY_MARKER)) {
            log.warn("Running with the development JWT signing key. "
                    + "Set LOCALFIX_JWT_SECRET before deploying.");
        }
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {
        return generateToken((UserPrincipal) authentication.getPrincipal());
    }

    public String generateToken(UserPrincipal userPrincipal) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(Long.toString(userPrincipal.getId()))
                .claim("email", userPrincipal.getEmail())
                .claim("name", userPrincipal.getName())
                .claim("role", userPrincipal.getAuthorities().stream()
                        .findFirst().map(a -> a.getAuthority()).orElse("ROLE_CUSTOMER"))
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}
