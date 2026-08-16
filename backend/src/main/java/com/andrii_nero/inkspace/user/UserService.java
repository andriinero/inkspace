package com.andrii_nero.inkspace.user;

import com.andrii_nero.inkspace.user.dto.UserCreationDTO;
import com.andrii_nero.inkspace.user.dto.UserDTO;
import com.andrii_nero.inkspace.user.exception.UserNotFoundException;
import com.andrii_nero.inkspace.user.mapper.UserMapper;
import com.andrii_nero.inkspace.user.model.User;
import com.andrii_nero.inkspace.user.model.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(UserMapper::userToUserDTO).toList();
    }

    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        return UserMapper.userToUserDTO(user);
    }

    public void saveUser(UserCreationDTO userCreationDTO) {
        User newUser = User.builder()
                .username(userCreationDTO.username())
                .password(userCreationDTO.password())
                .email(userCreationDTO.email())
                .role(UserRole.USER)
                .signUpDate(new Date())
                .profileImage(userCreationDTO.profileImage())
                .build();

        userRepository.save(newUser);
    }

    public void deleteUserById(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }

        userRepository.deleteById(id);
    }
}
