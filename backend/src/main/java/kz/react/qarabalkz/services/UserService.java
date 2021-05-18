package kz.react.qarabalkz.services;

import kz.react.qarabalkz.entities.Genres;
import kz.react.qarabalkz.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    Users saveUser(Users user);
    Users findByEmail(String email);
    Users findByEmailAndPassword(String email, String password);

    void changePassword(Users user, String newPassword);

    void changeFullName(Users user, String fullName);
    void deleteUser(Users user);

    Users getUser(Long id);

    List<Users> getUsers();

    int addRemoveRole(Long userId, Long roleId);
}