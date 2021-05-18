package kz.react.qarabalkz.rest;

import kz.react.qarabalkz.dto.*;
import kz.react.qarabalkz.entities.Users;
import kz.react.qarabalkz.jwt.JWTTokenGenerator;
import kz.react.qarabalkz.services.RoleService;
import kz.react.qarabalkz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private JWTTokenGenerator jwtTokenGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    public Users getUserFromToken(String token) {
        token = token.substring(7);
        System.out.println(token);
        return userService.findByEmail(jwtTokenGenerator.getEmailFromToken(token));
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal Users user) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/get/Roles")
    public ResponseEntity<?> getRoles() {
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.OK);
    }

    @PostMapping("/user/changePassword")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String token, @RequestBody PasswordRequest request) {
        Users user = getUserFromToken(token);
        if (!user.getPassword().equals(request.getOldPassword())) {
            return new ResponseEntity<>("Old", HttpStatus.BAD_REQUEST);
        }
        userService.changePassword(user, request.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/user/changeName")
    public ResponseEntity<?> changeName(@RequestHeader("Authorization") String token, @RequestBody UserNameRequest request) {
        Users user = getUserFromToken(token);
        userService.changeFullName(user, request.getFullName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/admin/addUser")
    public ResponseEntity<?> addUser(@RequestBody RegistrationRequest request) {
        Users user = userService.findByEmail(request.getEmail());
        if(user != null) return new ResponseEntity<>("Email exists", HttpStatus.BAD_REQUEST);
        userService.saveUser(new Users(null, request.getFullName(), request.getEmail(), request.getPassword(), null));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/admin/changeUser")
    public ResponseEntity<?> changeUser(@RequestBody RegistrationRequest request) {
        Users user = userService.findByEmail(request.getEmail());
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if (request.getEmail() != null && !request.getEmail().equals("")) user.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().equals("")) user.setPassword(request.getPassword());
        if (request.getFullName() != null && !request.getFullName().equals("")) user.setFullName(request.getFullName());
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/admin/deleteUser")
    public ResponseEntity<?> deleteUser(@RequestBody RegistrationRequest request) {
        Users user = userService.findByEmail(request.getEmail());
        userService.deleteUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/getUser/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Users user = userService.getUser(id);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/admin/addRemoveRole")
    public ResponseEntity<?> addRemoveRole(@RequestBody UserRoleRequest request) {
        int status = userService.addRemoveRole(request.getUserId(), request.getRoleId());
        if (status == -1) return new ResponseEntity<>("Role doesnt exists", HttpStatus.BAD_REQUEST);
        if (status == -2) return new ResponseEntity<>("User doesnt exists", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/Users")
    public ResponseEntity<?> getUsers(){
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

}
