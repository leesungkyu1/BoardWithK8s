package com.simple.simpleboard;

import com.simple.simpleboard.api.jwttoken.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ServletComponentScan
public class SimpleBoardApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleBoardApplication.class, args);
	}

	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(jwtFilter);
		registrationBean.setUrlPatterns(Arrays.asList("/post/*"));
		return registrationBean;
	}
}
