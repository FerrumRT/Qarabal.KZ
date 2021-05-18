package kz.react.qarabalkz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmRequest implements Serializable {

    private static final long serialVersionUID = 123456789L;

    private Long id;
    private String title;
    private String description;
    private Date release_date;
    private Long author_id;
    private String type;
}
