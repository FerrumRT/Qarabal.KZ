package kz.react.qarabalkz.services;

import kz.react.qarabalkz.entities.Authors;

import java.util.List;

public interface AuthorService {
    void addAuthor(Authors author);

    void saveAuthor(Authors author);

    void deleteAuthor(Authors author);

    Authors getAuthor(Long id);

    List<Authors> getAuthors();

    Authors getAuthor(String name);
}
