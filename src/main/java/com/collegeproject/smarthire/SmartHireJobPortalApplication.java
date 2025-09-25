package com.collegeproject.smarthire;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.collegeproject.smarthire") 
public class SmartHireJobPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartHireJobPortalApplication.class, args);
	}

}
