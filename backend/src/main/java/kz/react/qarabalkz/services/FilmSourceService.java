package kz.react.qarabalkz.services;

import kz.react.qarabalkz.entities.FilmSources;
import kz.react.qarabalkz.entities.Films;

import java.util.List;

public interface FilmSourceService {

    void addFilmSource(FilmSources filmSource);

    void saveFilmSource(FilmSources filmSource);

    void deleteFilmSource(FilmSources filmSource);

    FilmSources getFilmSource(Long id);

    List<FilmSources> getFilmSources();

    List<FilmSources> getFilmSourcesByFilm(Films film);
}
