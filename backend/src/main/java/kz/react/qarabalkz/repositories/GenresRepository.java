package kz.react.qarabalkz.repositories;

import kz.react.qarabalkz.entities.Genres;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenresRepository extends JpaRepository<Genres, Long> {
}
