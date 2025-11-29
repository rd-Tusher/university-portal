package com.versity.portal.versity_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String email,String username, String otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");

        helper.setTo(email);
        helper.setFrom("MBSTU Support <rdTusher004@gmail.com>");
        helper.setSubject("OTP for Email verification");

        String htmlContent = String.format("""
                <div style="font-family: sans-serif; text-align: center;">
                    <h2>Email Verification</h2>
                    <p>Your userID: <strong>%s</strong></p>
                    <p>You have to login with this:</p>

                    <p>Your OTP code:</p>
                    <h1 style="letter-spacing: 30px; font-size: 28px;">%s</h1>
                    <p>This code will expire in 5 minutes.</p>
                </div>
                """, username, otp);


        helper.setText(htmlContent,true);
        mailSender.send(message);
        return;
    }
}
