package com.andrii_nero.inkspace.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @UuidGenerator
    private String id;

    private String username;

    private String password;

    private String email;

    @Column(columnDefinition = "varchar(255) default 'USER'")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "sign_up_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date signUpDate;

    @Column(name = "profile_image")
    private String profileImage;
}