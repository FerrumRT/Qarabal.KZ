package kz.react.qarabalkz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmForeignerRequest implements Serializable {

    private static final long serialVersionUID = 123456789L;

    private Long film_id;
    private Long foreign_id;

}
