package kz.react.qarabalkz.rest;

import kz.react.qarabalkz.dto.AuthorRequest;
import kz.react.qarabalkz.entities.Authors;
import kz.react.qarabalkz.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/moderator/addAuthor")
    public ResponseEntity<?> addAuthor(@RequestBody AuthorRequest request){
        if (authorService.getAuthor(request.getName())!=null) return new ResponseEntity<>("Author exists", HttpStatus.BAD_REQUEST);
        authorService.addAuthor(new Authors(null, request.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/moderator/changeAuthor")
    public ResponseEntity<?> changeAuthor(@RequestBody AuthorRequest request) {
        Authors author = authorService.getAuthor(request.getId());
        if (author == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        author.setFullName(request.getName());
        authorService.saveAuthor(author);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/moderator/deleteAuthor")
    public ResponseEntity<?> deleteAuthor(@RequestBody AuthorRequest request) {
        Authors author = authorService.getAuthor(request.getId());
        if (author == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        authorService.deleteAuthor(new Authors(request.getId(), request.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get/Author/{id}")
    public ResponseEntity<?> getAuthor(@PathVariable Long id){
        Authors author = authorService.getAuthor(id);
        if(author == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping("/get/Authors")
    public ResponseEntity<?> getAuthors(){
        return new ResponseEntity<>(authorService.getAuthors(), HttpStatus.OK);
    }
}
