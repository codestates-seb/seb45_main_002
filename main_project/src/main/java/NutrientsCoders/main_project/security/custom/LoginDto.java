package NutrientsCoders.main_project.security.custom;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class LoginDto {
    private String email;
    private String password;
}