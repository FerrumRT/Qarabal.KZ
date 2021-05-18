package kz.react.qarabalkz.services.impl;

import kz.react.qarabalkz.entities.Genres;
import kz.react.qarabalkz.repositories.GenresRepository;
import kz.react.qarabalkz.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    private GenresRepository genresRepository;

    @Override
    public void addGenre(Genres genre) {
        genresRepository.save(genre);
    }

    @Override
    public void saveGenre(Genres genre) {
        genresRepository.save(genre);
    }

    @Override
    public void deleteGenre(Genres genre) {
        genresRepository.delete(genre);
    }

    @Override
    public Genres getGenre(Long id) {
        return genresRepository.findById(id).get();
    }

    @Override
    public List<Genres> getGenres() {
        return genresRepository.findAll();
    }
}
