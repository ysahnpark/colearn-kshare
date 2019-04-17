package dev.colearn.kshare.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {

    override
    fun configure(http: HttpSecurity) {
        System.out.println("* SecurityConfig.configure invoked")
        http.headers().frameOptions().sameOrigin() // to allow iframes
                .and().cors().and().csrf().disable()
                .authorizeRequests().antMatchers("/**").permitAll()
        //.authorizeRequests().antMatchers("/api/users/v1/login", "/api/users/v1/register").permitAll()
        //.anyRequest().authenticated()
    }

    // @see: https://docs.spring.io/spring-security/site/docs/current/reference/html/cors.html
    // @see: https://docs.spring.io/spring-security/site/docs/5.0.x/reference/html/cors.html#cors
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {

        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*")
        // configuration.allowedMethods = listOf("GET", "DELETE", "POST", "PUT", "OPTIONS")
        configuration.allowedMethods = listOf("*")
        configuration.allowedHeaders = listOf("*") // Without this, the PUT returns 403
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
}