package com.andrii_nero.inkspace.user.exception;

public class UserNotFoundException extends RuntimeException {
    private static final String USER_NOT_FOUND_TEMPLATE = "User with (id: %s) not found";

    public UserNotFoundException(String id) {
        super(String.format(USER_NOT_FOUND_TEMPLATE, id));
    }
}
