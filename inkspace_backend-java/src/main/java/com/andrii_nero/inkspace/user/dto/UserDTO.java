package com.andrii_nero.inkspace.user.dto;

import com.andrii_nero.inkspace.user.model.UserRole;

import java.util.Date;

public record UserDTO(
        String id,
        String username,
        String email,
        UserRole role,
        Date sign_up_date,
        String profile_image) {
}
