package kz.react.qarabalkz.services.impl;

import kz.react.qarabalkz.entities.Roles;
import kz.react.qarabalkz.repositories.RolesRepository;
import kz.react.qarabalkz.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public List<Roles> getRoles() {
        return rolesRepository.findAll();
    }
}
