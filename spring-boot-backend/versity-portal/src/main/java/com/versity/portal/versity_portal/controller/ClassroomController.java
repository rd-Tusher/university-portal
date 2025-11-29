package com.versity.portal.versity_portal.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.RestController;

import com.versity.portal.versity_portal.Service.ClassrommService;
import com.versity.portal.versity_portal.model.ClassroomModel;
import com.versity.portal.versity_portal.model.ClassroomModel.Announcements;
import com.versity.portal.versity_portal.model.ClassroomModel.Assignments;
import com.versity.portal.versity_portal.model.ClassroomModel.CreateRoomReq;
import com.versity.portal.versity_portal.model.ClassroomModel.Materials;
import com.versity.portal.versity_portal.repository.ClassroomRepository;
import com.versity.portal.versity_portal.repository.CourseRepository;
import com.versity.portal.versity_portal.repository.ClassroomRepository.ExistsRoomProjection;
import com.versity.portal.versity_portal.repository.CourseRepository.DepSemTeachPrejection;

import org.springframework.web.multipart.MultipartFile;




@RestController
public class ClassroomController {

    @Autowired
    JwtService jwtService;
    @Autowired
    CourseRepository courseRepo;
    @Autowired
    ClassroomRepository clmRepo;
    @Autowired
    DTFormatter dtFormatter;
    @Autowired
    ClassrommService clsService;


    @Value("${upload.dir}")
    private String uploadBaseDir;


    private String saveFile(MultipartFile file,String courseID,String asgnID,String type){
        try {

            Path uploadPath = Paths.get(uploadBaseDir ,type, courseID);
            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }


            String originalName = asgnID + "_"+file.getOriginalFilename();
            String fName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
            Path filePath = uploadPath.resolve(fName);
            Files.copy(file.getInputStream(), filePath,StandardCopyOption.REPLACE_EXISTING);
            String fileUrl = "http://localhost:8080/files/" + type + "/" + courseID + "/" + fName;
            return fileUrl;

        } catch (Exception e) {
            return null;
        }
    }

    @PostMapping("create-class-room")
    public ResponseEntity<?> createClassRoom(@RequestBody CreateRoomReq req, @CookieValue( value = "access_token") String token){

        try {
            String roomTitle = req.getRoomTitle();
            String courseID = req.getCourseID();
            String teacherID = jwtService.extractUserID(token);
            Optional<DepSemTeachPrejection> res = courseRepo.findByCourseID(courseID);
            if (res.isPresent()) {

                Optional<ExistsRoomProjection> existsRoom = clmRepo.findCourseByCourseID(courseID);
                if(existsRoom.isPresent()){
                    return ResponseEntity.ok("Classroom already created!");
                }

                ClassroomModel save = new ClassroomModel(res.get().getDepartment(), res.get().getSemester(), courseID, res.get().getCourseTeacher(),teacherID, roomTitle, LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
                clmRepo.save(save);
                return ResponseEntity.ok(save);
                  
            } else {
                return ResponseEntity.badRequest().body("Course ID not found!");
            }
        } catch (Exception e) { 
            e.printStackTrace(); 
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }




    @PostMapping("save-assignment")
    public ResponseEntity<?> saveAssign(
                @RequestParam String courseID,
                @RequestParam String title,
                @RequestParam String description,
                @RequestParam String date,
                @RequestParam String points,
                @RequestParam(required = false) MultipartFile file){
            try {

                Optional<ClassroomModel> res = clmRepo.findByCourseID(courseID);
                if(!res.isPresent()){
                    return ResponseEntity.badRequest().body("You haven't yet created class room for this course!");
                }

                List<Assignments> asgn = res.get().getAssignments();
                
                boolean exists = asgn.stream().anyMatch(a-> a.getTitle().equals(title));
                
                if(exists){
                    return ResponseEntity.ok("Title matched  with another assignment!");
                }
                
                String newAsngID;
                if(asgn.size() == 0){
                    newAsngID = "00001";
                }
                else{
                    int len = asgn.size()-1;
                    Assignments lastAsgn = asgn.get(len);
                    Integer id = Integer.parseInt(lastAsgn.getId());
                    int newID = (id % 99999) + 1;
                    newAsngID = String.format("%05d",newID);
                }


                String fileName="";
                if(!file.isEmpty()){
                    fileName = saveFile(file, courseID, newAsngID,"Assignments");
                }
                Assignments save = new Assignments(newAsngID, title, description, points, date, fileName);
                asgn.add(save);
                clmRepo.save(res.get());
                return ResponseEntity.ok("Assingment saved successfylly!");

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("error");
            }
        }
  

    @PostMapping("save-announcement")
    public ResponseEntity<?> saveAssignment(
            @RequestParam String courseID,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required=false) String date,
            @RequestParam(required=false) MultipartFile[] files) {
                try {
                    Optional<ClassroomModel> res = clmRepo.findByCourseID(courseID);
                    if(!res.isPresent()){
                        return ResponseEntity.badRequest().body("Class room not yet created for this course!");
                    }

                    List<Announcements> anc = res.get().getAnnouncements();

                    boolean exists = anc.stream().anyMatch(c -> c.getTitle().equals(title) );
                    if(exists){
                        return ResponseEntity.badRequest().body("Duplicate title name found!");
                    }

                    String newID;
                    if (anc.size() == 0) {
                        newID="00001";
                    } else {
                        Announcements lastAnc = anc.get(anc.size() - 1);
                        int lastID = Integer.parseInt(lastAnc.getId());
                        int newLastID = (lastID % 99999) + 1 ;
                        newID = String.format("%05d", newLastID);
                    }
                    List<String>AllFiles = new ArrayList<>();
                    if(files != null){
                        for (MultipartFile file : files) {
                            String fileName="";
                            if(!file.isEmpty()){
                                fileName = saveFile(file, courseID, newID,"Announcement");
                            }
                            AllFiles.add(fileName);
                        }
                    }
                    Announcements save = new Announcements(newID, title, description, dtFormatter.getFormatteddate() ,AllFiles);
                    anc.add(save);
                    clmRepo.save(res.get());
                    return ResponseEntity.ok("Announcement saved successfully!");

                } catch (Exception e) {
                    e.printStackTrace();
                    return ResponseEntity.badRequest().body("na");
                }
            }
    

    @PostMapping("save-materials")
    public ResponseEntity<?> saveMaterials(
            @RequestParam String courseID,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile[] files){
                try {
                    Optional<ClassroomModel> res =clmRepo.findByCourseID(courseID);
                    if(!res.isPresent()){
                        return ResponseEntity.badRequest().body("Class room yet not created");
                    }

                    List<Materials> mtl = res.get().getMaterials();
                    String newID;
                    if(mtl.size() == 0){
                        newID = "00001";
                    }
                    else {
                        int lastind = mtl.size() -1;
                        String lastID = mtl.get(lastind).getId();
                        int newid = Integer.parseInt(lastID);
                        int newLastId = (newid % 99999) + 1; 
                        newID = String.format("%05d", newLastId);
                    }

                    boolean exists = mtl.stream().anyMatch(m-> m.getTitle().equals(title));
                    if(exists){
                        return ResponseEntity.badRequest().body("Duplicate title found!");
                    }

                    List<String> AllFiles = new ArrayList<>();
                    if(files != null){
                        for (MultipartFile file : files) {
                            String fileName = "";
                            if(!file.isEmpty()){
                                fileName = saveFile(file, courseID, newID, "Material");
                                AllFiles.add(fileName);
                            }
                        }
                    }
                    Materials save = new Materials(courseID, newID, title, AllFiles, description,dtFormatter.getFormatteddate());
                    mtl.add(save);
                    clmRepo.save(res.get());
                    return ResponseEntity.ok("Data saved successfully!");
                } catch (Exception e) {
                    return ResponseEntity.badRequest().body("Error occured!");
                }
            }

    @GetMapping("fetch-classroom")
    public ResponseEntity<?> fetchRoom(@CookieValue(value = "access_token") String token){
        try {

            return clsService.getAllClassrooms(token);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("error");
        }
    }




    @GetMapping("get-classroom-title")
    public ResponseEntity<?> getClassroomTitle(@CookieValue(value="access_token") String token){
        try {
            String tid = jwtService.extractUserID(token);
            return clsService.getClassroomTitle(tid);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error occured");
        }
    }


    @GetMapping("fetch-room-details")
    public ResponseEntity<?> roomDetails(@RequestParam String courseID){
        try {
            Optional<ClassroomModel> res = clmRepo.findByCourseID(courseID);
            if(res.isPresent()){
                return ResponseEntity.ok(res.get());
            }
            return ResponseEntity.badRequest().body("Not found!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }

    @GetMapping("files/{type}/{courseID}/{filename}")
    public ResponseEntity<?> getFile(@PathVariable String type, @PathVariable String courseID, @PathVariable String filename){
        try {
            Path filePath = Paths.get(uploadBaseDir, type, courseID,filename);
            if(!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            String contentType = Files.probeContentType(filePath);
            if(contentType == null) contentType = "application/octet-stream";

            return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION   , "inline; filename=\"" + filename + "\"" ).body(new InputStreamResource(Files.newInputStream(filePath)));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }

    @GetMapping("files/{type}/{courseID}/Submission/{filename}")
    public ResponseEntity<?> getFiles(@PathVariable String type, @PathVariable String courseID, @PathVariable String filename){
        try {
            Path filePath = Paths.get(uploadBaseDir, type, courseID,"Submission",filename);
            if(!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            String contentType = Files.probeContentType(filePath);
            if(contentType == null) contentType = "application/octet-stream";

            return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION   , "inline; filename=\"" + filename + "\"" ).body(new InputStreamResource(Files.newInputStream(filePath)));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occured!");
        }
    }
}     