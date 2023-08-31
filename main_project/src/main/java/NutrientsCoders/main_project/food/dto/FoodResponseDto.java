package NutrientsCoders.main_project.food.dto;

import NutrientsCoders.main_project.food.entity.EtcNutrients;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
public class FoodResponseDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    private String brand;

    private String foodName;

    private String foodCategory1;

    private String foodCategory2;

    private Long servingSize;

    private Long kcal;

    private Double carbo;

    private Double protein;

    private Double fat;

    private EtcNutrients etcNutrients;

    private Boolean morning;

    private Double servingRate;
}
