package com.andrii_nero.inkspace.user;

import com.andrii_nero.inkspace.user.dto.PostUserRequest;
import com.andrii_nero.inkspace.user.dto.UserCreationDTO;
import com.andrii_nero.inkspace.user.dto.UserDTO;
import com.andrii_nero.inkspace.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> userList = userService.getAllUsers();

        return ResponseEntity.ok(userList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        UserDTO userDTO = userService.getUserById(id);

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping
    public ResponseEntity<Void> postUser(PostUserRequest request) {
        UserCreationDTO userCreationDTO = UserMapper.postUserRequestToUserCreationDTO(request);
        userService.saveUser(userCreationDTO);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);

        return ResponseEntity.ok().build();
    }
}
