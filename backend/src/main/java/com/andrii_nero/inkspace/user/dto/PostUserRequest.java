package com.andrii_nero.inkspace.user.dto;

public record PostUserRequest(
        String username,
        String password,
        String email,
        String profileImage) {
}