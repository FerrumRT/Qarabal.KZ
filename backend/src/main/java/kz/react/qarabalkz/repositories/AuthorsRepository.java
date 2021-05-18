package kz.react.qarabalkz.repositories;

import kz.react.qarabalkz.entities.Authors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorsRepository extends JpaRepository<Authors, Long> {
    Authors findByFullName(String name);
}
