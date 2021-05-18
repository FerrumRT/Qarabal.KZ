package kz.react.qarabalkz.services.impl;

import kz.react.qarabalkz.dto.FilmResponse;
import kz.react.qarabalkz.entities.Films;
import kz.react.qarabalkz.entities.UserRate;
import kz.react.qarabalkz.repositories.FilmsRepository;
import kz.react.qarabalkz.repositories.UserRatesRepository;
import kz.react.qarabalkz.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.DatatypeConverter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FilmServiceImpl implements FilmService {

    @Value("${file.upload.dir}")
    private String FILE_DIR;

    @Autowired
    private FilmsRepository filmsRepository;

    @Autowired
    private UserRatesRepository userRatesRepository;

    @Override
    public Films addFilm(Films film) {
        return filmsRepository.save(film);
    }

    @Override
    public void saveFilm(Films film) {
        filmsRepository.save(film);
    }

    @Override
    public void deleteFilm(Films film) {
        filmsRepository.delete(film);
    }

    @Override
    public Films getFilm(Long id) {
        try {
            return filmsRepository.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public FilmResponse getFilmResponse(Long id) {
        try {
            Films film = filmsRepository.findById(id).get();
            List<UserRate> userRates = userRatesRepository.findAllByFilm(film);
            int count = userRates.size();
            double average = 0;
            for (UserRate rate : userRates) {
                average += rate.getValue();
            }
            average = average / count;
            return new FilmResponse(film, count, average);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Films> getFilms(String text) {
        return filmsRepository.findAllByTitleContains(text);
    }

    @Override
    public List<FilmResponse> getFilmResponses(String text) {
        List<FilmResponse> filmResponses = new ArrayList<>();
        List<Films> films = filmsRepository.findAllByTitleContains(text);
        for (Films film : films) {
            List<UserRate> userRates = userRatesRepository.findAllByFilm(film);
            int count = userRates.size();
            double average = 0;
            if (count != 0) {
                for (UserRate rate : userRates) {
                    average += rate.getValue();
                }
                average = average / count;
            }
            filmResponses.add(new FilmResponse(film, count, average));
        }
        return filmResponses;
    }

    @Override
    public String setFile(Films film, MultipartFile file) throws NoSuchAlgorithmException, IOException {
        MessageDigest digest = MessageDigest.getInstance("SHA-1");
        digest.update(film.getId().toString().getBytes(StandardCharsets.UTF_8));
        String name = DatatypeConverter.printHexBinary(digest.digest()) + ".jpg";
        String url = FILE_DIR + name;
        File f = new File(url);
        f.createNewFile();
        FileOutputStream fos = new FileOutputStream(f);
        fos.write(file.getBytes());
        fos.close();
        return name;
    }
}
