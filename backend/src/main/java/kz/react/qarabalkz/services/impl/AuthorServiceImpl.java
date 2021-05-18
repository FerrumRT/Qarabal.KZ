package kz.react.qarabalkz.services.impl;

import kz.react.qarabalkz.entities.Authors;
import kz.react.qarabalkz.repositories.AuthorsRepository;
import kz.react.qarabalkz.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorsRepository authorsRepository;

    @Override
    public void addAuthor(Authors author) {
        authorsRepository.save(author);
    }

    @Override
    public void saveAuthor(Authors author) {
        authorsRepository.save(author);
    }

    @Override
    public void deleteAuthor(Authors author) {
        authorsRepository.delete(author);
    }

    @Override
    public Authors getAuthor(Long id) {
        return authorsRepository.findById(id).get();
    }

    @Override
    public List<Authors> getAuthors() {
        return authorsRepository.findAll();
    }

    @Override
    public Authors getAuthor(String name) {
        return authorsRepository.findByFullName(name);
    }
}
