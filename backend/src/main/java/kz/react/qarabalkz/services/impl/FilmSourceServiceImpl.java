package kz.react.qarabalkz.services.impl;

import kz.react.qarabalkz.entities.FilmSources;
import kz.react.qarabalkz.entities.Films;
import kz.react.qarabalkz.repositories.FilmSourcesRepository;
import kz.react.qarabalkz.services.FilmSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmSourceServiceImpl implements FilmSourceService {

    @Autowired
    private FilmSourcesRepository filmSourcesRepository;

    @Override
    public void addFilmSource(FilmSources filmSource) {
        filmSourcesRepository.save(filmSource);
    }

    @Override
    public void saveFilmSource(FilmSources filmSource) {
        filmSourcesRepository.save(filmSource);
    }

    @Override
    public void deleteFilmSource(FilmSources filmSource) {
        filmSourcesRepository.delete(filmSource);
    }

    @Override
    public FilmSources getFilmSource(Long id) {
        return filmSourcesRepository.findById(id).get();
    }

    @Override
    public List<FilmSources> getFilmSources() {
        return filmSourcesRepository.findAll();
    }

    @Override
    public List<FilmSources> getFilmSourcesByFilm(Films film) {
        return filmSourcesRepository.findAllByFilm(film);
    }
}
