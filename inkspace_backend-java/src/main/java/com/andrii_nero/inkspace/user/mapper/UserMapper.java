package com.andrii_nero.inkspace.user.mapper;

import com.andrii_nero.inkspace.user.dto.PostUserRequest;
import com.andrii_nero.inkspace.user.dto.UserCreationDTO;
import com.andrii_nero.inkspace.user.dto.UserDTO;
import com.andrii_nero.inkspace.user.model.User;

public class UserMapper {
    public static UserCreationDTO postUserRequestToUserCreationDTO(PostUserRequest user) {
        return new UserCreationDTO(
                user.username(),
                user.password(),
                user.email(),
                user.profileImage()
        );
    }

    public static UserDTO userToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getSignUpDate(),
                user.getProfileImage()
        );
    }
}
