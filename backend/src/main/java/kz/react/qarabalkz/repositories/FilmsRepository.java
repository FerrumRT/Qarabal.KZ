package kz.react.qarabalkz.repositories;

import kz.react.qarabalkz.entities.Films;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmsRepository extends JpaRepository<Films, Long> {
    List<Films> findAllByTitleContains(String text);
}
