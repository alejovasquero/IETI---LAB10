package eci.ieti.controller;



import com.mongodb.client.gridfs.model.GridFSFile;
import eci.ieti.data.TodoRepository;
import eci.ieti.data.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@RequestMapping("api")
@RestController
public class RESTController {


   //TODO inject components (TodoRepository and GridFsTemplate)

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;


    @CrossOrigin("*")
    @RequestMapping("/files/{filename}")
    public ResponseEntity<InputStreamResource> getFileByName(@PathVariable String filename) throws IOException {
        System.out.println("RETRIEVING");
        GridFSFile file = gridFsTemplate.findOne(new Query().addCriteria(Criteria.where("filename").is(filename)));
        if(file == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(resource.getContentType()))
                .body(new InputStreamResource(resource.getInputStream()));
    }


    @CrossOrigin("*")
    @PostMapping("/files")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {
        System.out.println(((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest());
        System.out.println(file.getName());

        gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());

        return ServletUriComponentsBuilder.fromCurrentRequestUri().toUriString() + "/" + file.getOriginalFilename() ;
    }

    @CrossOrigin("*")
    @PostMapping("/todo")
    public Todo createTodo(@RequestBody Todo todo) {
        System.out.println(todo.getFileUrl());
        return todoRepository.save(todo);
    }

    @CrossOrigin("*")
    @GetMapping("/todo")
    public List<Todo> getTodoList() {
        return todoRepository.findAll();
    }

}
