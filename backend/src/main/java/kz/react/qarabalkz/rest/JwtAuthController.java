package kz.react.qarabalkz.rest;

import kz.react.qarabalkz.dto.AuthRequest;
import kz.react.qarabalkz.dto.AuthResponse;
import kz.react.qarabalkz.dto.RegistrationRequest;
import kz.react.qarabalkz.entities.Users;
import kz.react.qarabalkz.jwt.JWTTokenGenerator;
import kz.react.qarabalkz.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.BeanIds;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JwtAuthController {

    @Autowired
    private JWTTokenGenerator jwtTokenGenerator;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(value = "/auth")
    public ResponseEntity<?> auth(@RequestBody AuthRequest request) throws Exception{
        final Users user = userService.findByEmailAndPassword(request.getEmail(), request.getPassword());

        if(user == null)
            return new ResponseEntity<>("Wrong email or password", HttpStatus.OK);

        authenticate(request.getEmail(), request.getPassword());

        final String token = jwtTokenGenerator.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(token, user));

    }

    public void authenticate(String email, String password) throws Exception{

        try{

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            SecurityContext context = SecurityContextHolder.getContext();

            context.setAuthentication(authentication);

            SecurityContextHolder.setContext(context);

        }catch (DisabledException e){
            throw new Exception("USER_DISABLED", e);
        }catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }

    }
    
    @PostMapping(value = "/logout")
    public ResponseEntity<?> toLogout() {
        return ResponseEntity.ok("Logout Complete");
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> toRegister(@RequestBody RegistrationRequest request){
        Users newUser = new Users();
        newUser.setFullName(request.getFullName());
        newUser.setPassword(request.getPassword());
        newUser.setEmail(request.getEmail());
        return ResponseEntity.ok(userService.saveUser(newUser));

    }

}