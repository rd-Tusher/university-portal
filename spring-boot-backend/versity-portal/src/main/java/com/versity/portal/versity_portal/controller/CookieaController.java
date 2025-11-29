package com.versity.portal.versity_portal.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CookieaController {
    @Autowired
    JwtService jwtService;

    @GetMapping("get-role")
    public ResponseEntity<?> getRole(@CookieValue(value = "access_token") String token){
        try {
            Object role = jwtService.extractRole(token);
            return ResponseEntity.ok(role );
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}