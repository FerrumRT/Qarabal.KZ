package kz.react.qarabalkz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "filmSource")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmSources {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "film_id")
    private Films film;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

}
