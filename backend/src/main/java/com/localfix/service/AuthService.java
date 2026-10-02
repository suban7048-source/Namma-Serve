package com.localfix.service;

import com.localfix.dto.AuthResponse;
import com.localfix.dto.LoginRequest;
import com.localfix.dto.RegisterRequest;
import com.localfix.entity.Role;
import com.localfix.entity.TechnicianProfile;
import com.localfix.entity.User;
import com.localfix.exception.BadRequestException;
import com.localfix.repository.TechnicianProfileRepository;
import com.localfix.repository.UserRepository;
import com.localfix.security.JwtTokenProvider;
import com.localfix.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TechnicianProfileRepository technicianProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       TechnicianProfileRepository technicianProfileRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.technicianProfileRepository = technicianProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    /**
     * Emails are the login identifier, so they must be compared consistently.
     * Everything that reads or writes User.email goes through this.
     */
    public static String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase(Locale.ROOT);
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        String email = normalizeEmail(req.getEmail());

        if (userRepository.existsByEmail(email)) {
            // Deliberately does not echo the address back — this endpoint is public,
            // so a verbose message turns it into an account-enumeration oracle.
            throw new BadRequestException("That email address is already registered. Try logging in instead.");
        }

        // Self-service registration can only ever create a customer or a technician.
        // Admin accounts are provisioned out of band; honouring a client-supplied
        // role here would let anyone POST themselves an admin account.
        Role userRole = Role.ROLE_CUSTOMER;
        if ("provider".equalsIgnoreCase(req.getRole()) || "technician".equalsIgnoreCase(req.getRole())) {
            userRole = Role.ROLE_TECHNICIAN;
        }

        User user = new User(
                req.getName().trim(),
                email,
                req.getPhone().trim(),
                passwordEncoder.encode(req.getPassword()),
                userRole,
                req.getArea()
        );

        User savedUser = userRepository.save(user);

        if (userRole == Role.ROLE_TECHNICIAN) {
            TechnicianProfile profile = new TechnicianProfile();
            profile.setUser(savedUser);
            profile.setBusinessName(req.getBusinessName() != null && !req.getBusinessName().isBlank()
                    ? req.getBusinessName().trim()
                    : req.getName().trim() + " Services");
            profile.setCategory(req.getCategory() != null ? req.getCategory() : "AC Repair & Service");
            profile.setLocation(req.getArea() != null ? req.getArea() + ", Chennai" : "Velachery, Chennai");
            profile.setIsVerified(false);
            profile.setVerificationStatus("PENDING");
            technicianProfileRepository.save(profile);
        }

        // Issue the token directly from the user we just persisted rather than
        // round-tripping through authenticationManager — the credentials are
        // known-good here, and re-authenticating costs a second bcrypt verify.
        String token = tokenProvider.generateToken(UserPrincipal.create(savedUser));

        return toAuthResponse(token, savedUser);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        String email = normalizeEmail(req.getEmail());

        // Throws BadCredentialsException on a wrong password and
        // UsernameNotFoundException on an unknown address; both are mapped to a
        // single 401 "Invalid email or password" by GlobalExceptionHandler so the
        // response does not reveal which accounts exist.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, req.getPassword())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = tokenProvider.generateToken(principal);

        // Read back through the id the principal was built from, not the raw
        // request email — the two can only diverge if normalization is wrong,
        // and this way a mismatch can never silently 400 a valid login.
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new BadRequestException("Account could not be loaded. Please try again."));

        return toAuthResponse(token, user);
    }

    private AuthResponse toAuthResponse(String token, User user) {
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(),
                user.getPhone(), user.getRole().name(), user.getArea());
    }
}
