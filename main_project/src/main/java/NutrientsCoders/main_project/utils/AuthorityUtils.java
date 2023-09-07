package NutrientsCoders.main_project.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthorityUtils {
    private final List<String> USER_ROLES_STRING = List.of("USER");

    public List<GrantedAuthority> createAuthorities(List<String> roles){
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_"+role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(String email){
        return USER_ROLES_STRING;
    }
}
