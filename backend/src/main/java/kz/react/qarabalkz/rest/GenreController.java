package kz.react.qarabalkz.rest;

import kz.react.qarabalkz.dto.GenreRequest;
import kz.react.qarabalkz.entities.Genres;
import kz.react.qarabalkz.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping("/moderator/addGenre")
    public ResponseEntity<?> addGenre(@RequestBody GenreRequest request) {
        genreService.addGenre(new Genres(null, request.getGenre()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/moderator/changeGenre")
    public ResponseEntity<?> changeGenre(@RequestBody GenreRequest request) {
        Genres genre = genreService.getGenre(request.getId());
        if (genre == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if (request.getGenre() != null) genre.setGenre(request.getGenre());
        genreService.saveGenre(genre);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/moderator/deleteGenre")
    public ResponseEntity<?> deleteGenre(@RequestBody GenreRequest request) {
        Genres genre = genreService.getGenre(request.getId());
        genreService.deleteGenre(genre);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get/Genre/{id}")
    public ResponseEntity<?> getGenre(@PathVariable Long id) {
        Genres genre = genreService.getGenre(id);
        if (genre == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(genre, HttpStatus.OK);
    }

    @GetMapping("/get/Genres")
    public ResponseEntity<?> getGenres(){
        return new ResponseEntity<>(genreService.getGenres(), HttpStatus.OK);
    }
}
