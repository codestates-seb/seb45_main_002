package NutrientsCoders.main_project.food.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

@AllArgsConstructor
@Getter
@Entity
public class EtcNutrients {

    @Id
    @Column(name = "ETCNUTRIENTS_ID")
    private Long etcNutrientsId;
    
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "FOOD_ID")
    private Food food;

    @Column(updatable = false)
    private Double cholesterol;

    @Column(updatable = false)
    private Double sugar;

    @Column(updatable = false)
    private Double natrium;

    @Column(updatable = false)
    private Double vitaminA;

    @Column(updatable = false)
    private Double vitaminE;

    @Column(updatable = false)
    private Double vitaminB1;

    @Column(updatable = false)
    private Double vitaminB2;

    @Column(updatable = false)
    private Double vitaminB3;

    @Column(updatable = false)
    private Double vitaminB6;

    @Column(updatable = false)
    private Double vitaminB12;

    @Column(updatable = false)
    private Double vitaminC;

    @Column(updatable = false)
    private Double vitaminD;

    @Column(updatable = false)
    private Double dietaryFiber;

    @Column(updatable = false)
    private Double folicAcid;
    
    @Column(updatable = false)
    private Double calcium;

    @Column(updatable = false)
    private Double iron;

    @Column(updatable = false)
    private Double potassium;
    
    public EtcNutrients() {
    
    }
}
