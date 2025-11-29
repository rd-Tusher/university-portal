package com.versity.portal.versity_portal.controller;

// import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.versity.portal.versity_portal.model.OtpModel;
import com.versity.portal.versity_portal.repository.OtpRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.SecureRandom;

@RestController
public class RegisterController {
    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpRepository otpRepository;


        @GetMapping("form")
        public String showinfo(){
            return "this is for text only";
        }

        private String generateOtp(){
            StringBuilder otp  = new StringBuilder(8);
            SecureRandom random = new SecureRandom();
            String allowedChar = "ABCDEFGHIJKL12345MNOPQRST$2&@UVWXYZ90875JANSIEJFAJDK093783%";
            for(int i = 0; i<8; i++){
                otp.append(allowedChar.charAt(random.nextInt(allowedChar.length())));
            }
            return otp.toString();
        }
  
        @PostMapping("/send-otp")
        public ResponseEntity<?> sendOtp(@RequestBody Map<String,String> data) {
            try {
                String email = data.get("email");
                String otp = generateOtp();
                String username = email.split("@")[0];
                
                emailService.sendOtpEmail(email,username, otp);
                
                OtpModel otpModel = new OtpModel(email,otp);
                otpRepository.save(otpModel);
                
                return ResponseEntity.status(200).body("Otp send successfully!");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Error occured!");
            }
        }


        @PostMapping("/verify-otp")
        public ResponseEntity<?> verifyOtp(@RequestBody Map<String,String> data){
            try {
                
                String otp = data.get("otp");
                String email = data.get("email");


                if(otp == null || otp.isEmpty()){
                    return ResponseEntity.badRequest().body("Otp is required");
                }
 
                Optional <OtpModel> response =  otpRepository.findByOtpAndEmail(otp,email);

                if(response.isPresent()){ 
                    OtpModel otpModel = response.get();
                    // System.out.println(otpModel);
                    boolean flag = otpModel.isExpired(otpModel.getExpireAt());
                    
                    if(!flag)  return ResponseEntity.status(200).body(otpModel);
                    else return ResponseEntity.badRequest().body("Otp Expired!");
                }

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Otp not found or expired!"); 
                
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error Occured!"); 
            }

        } 
}  