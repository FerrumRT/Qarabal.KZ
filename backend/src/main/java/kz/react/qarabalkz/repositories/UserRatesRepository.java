package kz.react.qarabalkz.repositories;

import kz.react.qarabalkz.entities.Films;
import kz.react.qarabalkz.entities.UserRate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRatesRepository extends JpaRepository<UserRate, Long> {
    List<UserRate> findAllByFilm(Films film);
}
