package kz.react.qarabalkz.rest;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import kz.react.qarabalkz.dto.FilmForeignerRequest;
import kz.react.qarabalkz.dto.FilmRequest;
import kz.react.qarabalkz.dto.FilmResponse;
import kz.react.qarabalkz.entities.FilmSources;
import kz.react.qarabalkz.entities.Films;
import kz.react.qarabalkz.entities.Genres;
import kz.react.qarabalkz.entities.Users;
import kz.react.qarabalkz.services.AuthorService;
import kz.react.qarabalkz.services.FilmService;
import kz.react.qarabalkz.services.FilmSourceService;
import kz.react.qarabalkz.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FilmController {

    @Autowired
    private FilmService filmService;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private FilmSourceService filmSourceService;

    @PostMapping("/moderator/addFilm")
    @JsonDeserialize(as = MultipartFile.class)
    public ResponseEntity<?> addFilm(@RequestBody FilmRequest request) {
        Films film = new Films();
        film.setTitle(request.getTitle());
        film.setDescription(request.getDescription());
        film.setRelease_date(request.getRelease_date());
        film.setType(request.getType());
        film.setAuthor(authorService.getAuthor(request.getAuthor_id()));
        film = filmService.addFilm(film);
        return new ResponseEntity<>(film, HttpStatus.OK);
    }

    @PostMapping("/moderator/addFilmPhoto/{id}")
    public ResponseEntity<?> addFilmPhoto(@PathVariable Long id, @RequestBody MultipartFile file) {
        Films film = filmService.getFilm(id);
        try {
            film.setPhoto_url(filmService.setFile(film, file));
            filmService.saveFilm(film);
        }catch (Exception e){
            System.out.println("Error "+e.toString());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/moderator/changeFilm")
    public ResponseEntity<?> changeFilm(@RequestBody FilmRequest request) {
        Films film = filmService.getFilm(request.getId());
        if (film == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if (request.getTitle() != null) film.setTitle(request.getTitle());
        if (request.getDescription() != null) film.setDescription(request.getDescription());
        if (request.getRelease_date() != null) film.setRelease_date(request.getRelease_date());
        if (request.getAuthor_id() != null) film.setAuthor(authorService.getAuthor(request.getAuthor_id()));
        if (request.getType() != null) film.setType(request.getType());
        filmService.saveFilm(film);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/moderator/addRemoveGenre")
    public ResponseEntity<?> addRemoveGenre(@RequestBody FilmForeignerRequest request) {
        Films film = filmService.getFilm(request.getFilm_id());
        Genres genre = genreService.getGenre(request.getForeign_id());
        if (film == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        List<Genres> genres = film.getGenres();
        if (genres.contains(genre)) {
            genres.remove(genre);
        } else {
            genres.add(genre);
        }
        film.setGenres(genres);
        filmService.saveFilm(film);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/moderator/deleteFilm")
    public ResponseEntity<?> deleteFilm(@RequestBody FilmRequest request) {
        Films film = filmService.getFilm(request.getId());
        filmService.deleteFilm(film);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get/Film/{id}")
    public ResponseEntity<?> getFilm(@PathVariable Long id) {
        FilmResponse filmR = filmService.getFilmResponse(id);
        if (filmR == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Films film = filmR.getFilm();
        List<FilmSources> filmSources = filmSourceService.getFilmSourcesByFilm(film);
        for (FilmSources filmSource : filmSources) {
            filmSource.setFilm(null);
        }
        film.setFilmSources(filmSources);
        filmR.setFilm(film);
        return new ResponseEntity<>(filmR, HttpStatus.OK);
    }

    @GetMapping("/get/Films")
    public ResponseEntity<?> getFilms(@RequestParam(name = "search") String text) {
        System.out.println(text);
        List<FilmResponse> filmsR = filmService.getFilmResponses(text);
        for (int i = 0; i < filmsR.size(); i++) {
            Films film = filmsR.get(i).getFilm();
            film.setFilmSources(null);
            filmsR.get(i).setFilm(film);
        }
        return new ResponseEntity<>(filmsR, HttpStatus.OK);
    }
}
