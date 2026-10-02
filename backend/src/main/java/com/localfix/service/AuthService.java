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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Email is already registered: " + req.getEmail());
        }

        Role userRole = Role.ROLE_CUSTOMER;
        if ("provider".equalsIgnoreCase(req.getRole()) || "technician".equalsIgnoreCase(req.getRole())) {
            userRole = Role.ROLE_TECHNICIAN;
        } else if ("admin".equalsIgnoreCase(req.getRole())) {
            userRole = Role.ROLE_ADMIN;
        }

        User user = new User(
                req.getName(),
                req.getEmail(),
                req.getPhone(),
                passwordEncoder.encode(req.getPassword()),
                userRole,
                req.getArea()
        );

        User savedUser = userRepository.save(user);

        // If registering as technician, initialize profile
        if (userRole == Role.ROLE_TECHNICIAN) {
            TechnicianProfile profile = new TechnicianProfile();
            profile.setUser(savedUser);
            profile.setBusinessName(req.getName() + " Services");
            profile.setCategory(req.getCategory() != null ? req.getCategory() : "AC Repair & Service");
            profile.setLocation(req.getArea() != null ? req.getArea() + ", Chennai" : "Velachery, Chennai");
            profile.setIsVerified(false);
            profile.setVerificationStatus("PENDING");
            technicianProfileRepository.save(profile);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        return new AuthResponse(token, savedUser.getId(), savedUser.getName(), savedUser.getEmail(),
                savedUser.getPhone(), savedUser.getRole().name(), savedUser.getArea());
    }

    public AuthResponse login(LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(),
                user.getPhone(), user.getRole().name(), user.getArea());
    }
}
