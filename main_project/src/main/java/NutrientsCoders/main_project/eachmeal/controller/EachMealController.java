package NutrientsCoders.main_project.eachmeal.controller;

import NutrientsCoders.main_project.utils.PagedResponse;
import NutrientsCoders.main_project.eachmeal.dto.EachMealDto;
import NutrientsCoders.main_project.eachmeal.dto.EachMealResponseDto;
import NutrientsCoders.main_project.eachmeal.dto.EachMealResponseSimpleDto;
import NutrientsCoders.main_project.eachmeal.entity.EachMeal;
import NutrientsCoders.main_project.eachmeal.entity.EachMealFood;
import NutrientsCoders.main_project.eachmeal.mapper.EachMealMapper;
import NutrientsCoders.main_project.eachmeal.service.EachMealService;
import NutrientsCoders.main_project.utils.TokenChanger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eachmeals")
public class EachMealController {
  private final EachMealService eachMealService;
  private final EachMealMapper eachMealMapper;
  private final TokenChanger tokenChanger;
  
  public EachMealController(EachMealService eachMealService, EachMealMapper eachMealMapper, TokenChanger tokenChanger) {
    this.eachMealService = eachMealService;
    this.eachMealMapper = eachMealMapper;
    this.tokenChanger = tokenChanger;
  }
  
  //작성한 끼니 저장
  @PostMapping
  public ResponseEntity<EachMealResponseDto> postEachMeal(@RequestHeader("Authorization") String token,
                                                          @RequestBody EachMealDto eachMealDto) throws Exception {
    long memberId = tokenChanger.getMemberId(token);
    List<EachMealFood> eachMealFoods = eachMealMapper.eachMealFoodDtosToEachMealFoods(eachMealDto.getFoods());
    EachMeal eachMeal = eachMealMapper.eachMealDtoToEachMeal(eachMealDto);
    EachMeal savedEachMeal = eachMealService.createEachMeal(eachMeal, eachMealFoods, memberId);
    EachMealResponseDto response = eachMealMapper.eachMealToEachMealResponseDto(savedEachMeal);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }
  
  //작성한 끼니 조회
  @GetMapping("/{eachmealid}")
  public ResponseEntity<EachMealResponseDto> getEachMeal(@RequestHeader("Authorization") String token,
                                                         @PathVariable("eachmealid") long eachMealId) {
    long memberId = tokenChanger.getMemberId(token);
    EachMeal eachMeal = eachMealService.findByEachMeal(eachMealId, memberId);
    EachMealResponseDto response = eachMealMapper.eachMealToEachMealResponseDto(eachMeal);

    return new ResponseEntity<>(response,HttpStatus.OK);
  }
  
  //작성한 끼니 전체 조회(전체)
  @GetMapping
  public ResponseEntity<PagedResponse<EachMealResponseSimpleDto>> getEachMeals(@RequestHeader("Authorization") String token,
                                                                      @RequestParam int page, @RequestParam int size) {
    Pageable pageable = PageRequest.of(page - 1, size);
    long memberId = tokenChanger.getMemberId(token);
    Page<EachMeal> eachMeals = eachMealService.findByEachMeals(memberId, pageable);
    List<EachMealResponseSimpleDto> response = eachMealMapper.eachMealToEachMealResponseSimpleDto(eachMeals.getContent());
    
    PagedResponse<EachMealResponseSimpleDto> pagedResponse = new PagedResponse<>(
        response, eachMeals.getTotalElements(), eachMeals.getTotalPages(), eachMeals.isLast()
    );
    
    return new ResponseEntity<>(pagedResponse, HttpStatus.OK);
  }
  
  //작성한 끼니 전체 조회(선호)
  @GetMapping("/favorite")
  public ResponseEntity<PagedResponse<EachMealResponseSimpleDto>> getFavoriteEachMeals(@RequestHeader("Authorization") String token,
                                                                      @RequestParam int page, @RequestParam int size) {
    Pageable pageable = PageRequest.of(page - 1, size);
    long memberId = tokenChanger.getMemberId(token);
    Page<EachMeal> eachMeals = eachMealService.findByfavoriteEachMeals(memberId, pageable);
    List<EachMealResponseSimpleDto> response = eachMealMapper.eachMealToEachMealResponseSimpleDto(eachMeals.getContent());
    
    PagedResponse<EachMealResponseSimpleDto> pagedResponse = new PagedResponse<>(
        response, eachMeals.getTotalElements(), eachMeals.getTotalPages(), eachMeals.isLast()
    );
    
    return new ResponseEntity<>(pagedResponse, HttpStatus.OK);
  }

  //작성한 끼니 수정
  @PatchMapping("/{eachmealid}")
  public ResponseEntity<EachMealResponseDto> patchEachMeal(@RequestHeader("Authorization") String token,
                                                           @PathVariable("eachmealid") long eachMealId,
                                                           @RequestBody EachMealDto eachMealDto) {
    long memberId = tokenChanger.getMemberId(token);
    List<EachMealFood> eachMealFoods = eachMealMapper.eachMealFoodDtosToEachMealFoods(eachMealDto.getFoods());
    EachMeal eachMeal = eachMealMapper.eachMealDtoToEachMeal(eachMealDto);
    EachMeal updateEachMeal = eachMealService.updateEachMeal(memberId, eachMeal, eachMealFoods, eachMealId);
    
    EachMealResponseDto response
        = eachMealMapper.eachMealToEachMealResponseDto(updateEachMeal);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //작성한 끼니 삭제
  @DeleteMapping("/{eachmealid}")
  public ResponseEntity<EachMealResponseDto> deleteEachMeal(@RequestHeader("Authorization") String token,
                                                            @PathVariable("eachmealid") long eachMealId) {
  long memberId = tokenChanger.getMemberId(token);
  eachMealService.deleteEachMeal(eachMealId, memberId);
  
  return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
