package kz.react.qarabalkz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "films")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Films {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Genres> genres;

    @Column(name = "release_date")
    private Date release_date;

    @Column(name = "type")
    private String type;
    
    @Column(name = "photo_url")
    private String photo_url;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Authors author;

    @OneToMany(mappedBy = "film")
    private List<FilmSources> filmSources;

}
