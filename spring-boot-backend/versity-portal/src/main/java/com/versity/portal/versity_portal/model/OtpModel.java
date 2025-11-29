package com.versity.portal.versity_portal.model;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "otp_collection")
public class OtpModel {
 
    @Id
    private String id;

    private String otp;
    private String email;
    private Date issuedAt;

    @Indexed(name = "expireAt_ttl_index", expireAfter = "0s")
    private Date expireAt;

    public OtpModel() {}

    public OtpModel(String email, String otp) {
        this.email = email;
        this.otp = otp;
        this.issuedAt = new Date();
        this.expireAt = new Date(System.currentTimeMillis() +  5 * 60 * 1000); 
    }

    public String getEmail() { return email; }
    public String getOtp() { return otp; }
    public Date getExpireAt() { return expireAt; }
    public Date getIssuedAt() { return issuedAt; }

    public boolean isExpired(Date expireAt) {
        return new Date().after(expireAt);
    }
}
