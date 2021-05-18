package kz.react.qarabalkz.repositories;

import kz.react.qarabalkz.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByRole(String role);
}
