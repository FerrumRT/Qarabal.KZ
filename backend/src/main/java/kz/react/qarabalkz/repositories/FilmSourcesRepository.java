package kz.react.qarabalkz.repositories;

import kz.react.qarabalkz.entities.FilmSources;
import kz.react.qarabalkz.entities.Films;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmSourcesRepository extends JpaRepository<FilmSources, Long> {
    List<FilmSources> findAllByFilm(Films film);
}
