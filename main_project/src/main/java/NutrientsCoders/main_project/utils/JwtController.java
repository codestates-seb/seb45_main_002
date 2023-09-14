package NutrientsCoders.main_project.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JwtController {

    public JwtController(TokenChanger tokenChanger) {
        this.tokenChanger = tokenChanger;
    }

    private final TokenChanger tokenChanger;


    @GetMapping("/refresh")
    public ResponseEntity<List<String>> refresh(@RequestHeader("Authorization")String access,
                                             @RequestHeader("Refresh")String refresh){

        List<String> tokens = tokenChanger.getRefresh(access, refresh);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", tokens.get(0));
        headers.add("Refresh", tokens.get(1));

        return ResponseEntity.ok().headers(headers).body(tokens);
    }
}
