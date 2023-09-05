package NutrientsCoders.main_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
/*생성시간 수정시간을 사용하기 위해서 추가*/
@EnableJpaAuditing
public class MainProjectApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(MainProjectApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(MainProjectApplication.class);
	}

}