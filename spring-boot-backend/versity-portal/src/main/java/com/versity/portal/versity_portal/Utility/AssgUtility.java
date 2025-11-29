package com.versity.portal.versity_portal.Utility;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class AssgUtility {

    @Value("${upload.dir}")
    private String uploadBaseDir;

    public String saveFile(MultipartFile file, String courseID, String assgID, String type){
        try {

            Path uploadPath = Paths.get(uploadBaseDir ,type, courseID,"Submission");
    
            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }
            String originalName = assgID + "_"+file.getOriginalFilename();
            String fName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
            
            Path filePath = uploadPath.resolve(fName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "http://localhost:8080/files/"
                + type + "/"
                + courseID + "/Submission/"
                + fName;
            
            return fileUrl;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}