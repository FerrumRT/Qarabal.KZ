package kz.react.qarabalkz.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_rates")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "film_id")
    private Films film;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "value", nullable = false)
    private int value;
}
