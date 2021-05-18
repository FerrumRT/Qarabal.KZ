package kz.react.qarabalkz.rest;

import kz.react.qarabalkz.dto.FilmRequest;
import kz.react.qarabalkz.dto.FilmSourceRequest;
import kz.react.qarabalkz.entities.FilmSources;
import kz.react.qarabalkz.entities.Films;
import kz.react.qarabalkz.services.FilmService;
import kz.react.qarabalkz.services.FilmSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FilmSourceController {

    @Autowired
    private FilmService filmService;

    @Autowired
    private FilmSourceService filmSourceService;

    @PostMapping("/moderator/addFilmSource")
    public ResponseEntity<?> addFilm(@RequestBody FilmSourceRequest request) {
        Films film =  filmService.getFilm(request.getFilmId());
        if(film == null) return new ResponseEntity<>("film doesn't exist", HttpStatus.BAD_REQUEST);
        filmSourceService.addFilmSource(new FilmSources(null, film, request.getName(), request.getUrl()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/moderator/deleteFilmSource")
    public ResponseEntity<?> deleteFilm(@RequestBody FilmSourceRequest request) {
        filmSourceService.deleteFilmSource(new FilmSources(request.getId(), new Films(), request.getName(), request.getUrl()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
