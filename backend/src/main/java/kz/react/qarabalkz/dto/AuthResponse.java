package kz.react.qarabalkz.dto;

import kz.react.qarabalkz.entities.Users;

import java.io.Serializable;

public class AuthResponse implements Serializable {
    private static final long serialVersionUID = 7777777L;
    private final String jwtToken;
    private final Users userDetails;

    public AuthResponse(String jwtToken, Users userDetails){
        this.jwtToken = jwtToken;
        this.userDetails = userDetails;
    }

    public String getJwtToken(){
        return this.jwtToken;
    }

    public Users getUserDetails(){
        return this.userDetails;
    }
}
