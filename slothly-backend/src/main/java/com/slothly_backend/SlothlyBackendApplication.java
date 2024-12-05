package com.slothly_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@SpringBootApplication
public class SlothlyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SlothlyBackendApplication.class, args);
	}


//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.httpBasic(Customizer.withDefaults()).authorizeHttpRequests(authrz -> authrz.anyRequest().authenticated());  // Используем Customizer для настройки HTTP Basic
//		return http.build();
//	}



}
