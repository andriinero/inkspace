package com.andrii_nero.inkspace.user.dto;

public record UserCreationDTO(
        String username,
        String password,
        String email,
        String profileImage) {
}
