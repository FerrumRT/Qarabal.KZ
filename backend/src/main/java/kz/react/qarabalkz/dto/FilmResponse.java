package kz.react.qarabalkz.dto;

import kz.react.qarabalkz.entities.Films;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmResponse implements Serializable {
    private static final long serialVersionUID = 7777777L;
    private Films film;
    private int rateCount;
    private double averageRate;
}
