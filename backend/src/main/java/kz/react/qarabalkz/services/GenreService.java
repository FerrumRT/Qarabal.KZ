package kz.react.qarabalkz.services;

import kz.react.qarabalkz.entities.Genres;
import java.util.List;

public interface GenreService {
    void addGenre(Genres genre);

    void saveGenre(Genres genre);

    void deleteGenre(Genres genre);

    Genres getGenre(Long id);
    List<Genres> getGenres();
}
