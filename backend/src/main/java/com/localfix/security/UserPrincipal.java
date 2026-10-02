package com.localfix.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.localfix.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private final Long id;
    private final String email;
    private final String name;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String email, String name, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());
        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getPassword(),
                Collections.singletonList(authority)
        );
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getName() { return name; }

    @Override
    public String getUsername() { return email; }

    /**
     * {@code /api/auth/me} serialises this object straight to the client, so the
     * hash must never be part of its JSON representation.
     */
    @Override
    @JsonIgnore
    public String getPassword() { return password; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
