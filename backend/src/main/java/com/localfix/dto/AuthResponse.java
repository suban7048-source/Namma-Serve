package com.localfix.dto;

public class AuthResponse {

    private String token;
    private String tokenType = "Bearer";
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String area;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String name, String email, String phone, String role, String area) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.area = area;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
}
