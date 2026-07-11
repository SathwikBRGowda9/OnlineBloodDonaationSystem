package com.example.demo.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoogleLoginRequest {
    private String googleId;
    private String email;
    private String name;
    private String profilePicture;
}
