package kz.react.qarabalkz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest implements Serializable {

    private static final long serialVersionUID = 7777777L;

    private String email;
    private String password;

}
