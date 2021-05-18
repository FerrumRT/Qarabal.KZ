package kz.react.qarabalkz.services;

import kz.react.qarabalkz.dto.FilmResponse;
import kz.react.qarabalkz.entities.Films;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface FilmService {
    Films addFilm(Films film);

    void saveFilm(Films film);

    void deleteFilm(Films film);

    Films getFilm(Long id);

    FilmResponse getFilmResponse(Long id);

    List<Films> getFilms(String text);

    List<FilmResponse> getFilmResponses(String text);

    String setFile(Films film, MultipartFile file) throws NoSuchAlgorithmException, IOException;
}
