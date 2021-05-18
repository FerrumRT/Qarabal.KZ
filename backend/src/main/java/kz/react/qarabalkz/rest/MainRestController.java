package kz.react.qarabalkz.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class MainRestController {

    @GetMapping(value = "/profile")
    public String profilePage(){
        return "Hello Profile";
    }

}
