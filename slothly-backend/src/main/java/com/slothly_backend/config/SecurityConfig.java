package com.slothly_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        http.httpBasic(Customizer.withDefaults()).authorizeHttpRequests(authrz ->
                authrz.requestMatchers("/public/**")
                .permitAll()
                .requestMatchers("/admin/**")
                .hasRole("ADMIN").anyRequest()
                .authenticated());
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsManager() { //Створюємо двох користувачів
        return new InMemoryUserDetailsManager(User.withUsername("user").
                password(PasswordEncoder().encode("password")).
                authorities("USER").build(),
                User.withUsername("admin").
                        password(PasswordEncoder().encode("password")).
                        authorities("ADMIN").build());
    }

    @Bean
    public PasswordEncoder PasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
