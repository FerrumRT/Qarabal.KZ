package kz.react.qarabalkz.services.impl;

import kz.react.qarabalkz.entities.Roles;
import kz.react.qarabalkz.entities.Users;
import kz.react.qarabalkz.repositories.RolesRepository;
import kz.react.qarabalkz.repositories.UserRepository;
import kz.react.qarabalkz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository usersRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users saveUser(Users user) {
        if (user.getRoles() == null) {
            Roles userRole = rolesRepository.findByRole("ROLE_USER");
            List<Roles> userRoles = new ArrayList<>();
            userRoles.add(userRole);
            user.setRoles(userRoles);
        }
        if (user.getId() == null || user.getId() != null &&
                !user.getPassword().equals(usersRepository.findById(user.getId()).get().getPassword()))
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    @Override
    public Users findByEmail(String email) {
        return usersRepository.findFirstByEmail(email);
    }

    @Override
    public Users findByEmailAndPassword(String email, String password) {
        Users user = findByEmail(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    @Override
    public void changePassword(Users user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        usersRepository.save(user);
    }

    @Override
    public void changeFullName(Users user, String fullName) {
        user.setFullName(fullName);
        usersRepository.save(user);
    }

    @Override
    public void deleteUser(Users user) {
        if (user != null) usersRepository.delete(user);
    }

    @Override
    public Users getUser(Long id) {
        return usersRepository.findById(id).get();
    }

    @Override
    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

    @Override
    public int addRemoveRole(Long userId, Long roleId) {
        if (usersRepository.existsById(userId)) {
            Users user = usersRepository.findById(userId).get();
            if (rolesRepository.existsById(roleId)){
                Roles role = rolesRepository.findById(roleId).get();
                List<Roles> roles = user.getRoles();
                if (user.getRoles().contains(role)){
                    roles.remove(role);
                } else {
                    roles.add(role);
                }
                user.setRoles(roles);
                usersRepository.save(user);
                return 0;
            }
            return -1;
        }
        return -2;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = usersRepository.findByEmail(s);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }
}