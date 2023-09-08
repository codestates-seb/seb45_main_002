package NutrientsCoders.main_project.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SecurityTestController {


    @GetMapping("/auth")
    public ResponseEntity<String> test(@RequestHeader("token") String token){

        System.out.println(token);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

}
