package NutrientsCoders.main_project.utils.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
  
  
  
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    String massage = "유효하지 않은 값입니다";
    return new ResponseEntity<>(massage, HttpStatus.resolve(404));
  }
  
  @ExceptionHandler(LogicException.class)
  public ResponseEntity<Object> handleCustomViolationException(LogicException ex) {
    if (ex.getExceptionCode() == ExceptionCode.MEMBER_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.MEMBER_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.MEMBER_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.COMMUNITY_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.COMMUNITY_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.COMMUNITY_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.COMMENT_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.COMMENT_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.COMMENT_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.USER_EXISTS) {return new ResponseEntity<>(ExceptionCode.USER_EXISTS.getMessage(), HttpStatus.resolve(ExceptionCode.USER_EXISTS.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.DATE_EXISTS) {return new ResponseEntity<>(ExceptionCode.DATE_EXISTS.getMessage(), HttpStatus.resolve(ExceptionCode.DATE_EXISTS.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.MEAL_ALREADY_FULL) {return new ResponseEntity<>(ExceptionCode.MEAL_ALREADY_FULL.getMessage(), HttpStatus.resolve(ExceptionCode.MEAL_ALREADY_FULL.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.POST_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.POST_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.POST_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.FOOD_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.FOOD_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.FOOD_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.EACHMEAL_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.EACHMEAL_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.EACHMEAL_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.DAILYMEAL_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.DAILYMEAL_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.DAILYMEAL_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.ANALYSIS_NOT_FOUND) {return new ResponseEntity<>(ExceptionCode.ANALYSIS_NOT_FOUND.getMessage(), HttpStatus.resolve(ExceptionCode.ANALYSIS_NOT_FOUND.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.CANNOT_APPLY) {return new ResponseEntity<>(ExceptionCode.CANNOT_APPLY.getMessage(), HttpStatus.resolve(ExceptionCode.CANNOT_APPLY.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.NOT_IMPLEMENTATION) {return new ResponseEntity<>(ExceptionCode.NOT_IMPLEMENTATION.getMessage(), HttpStatus.resolve(ExceptionCode.NOT_IMPLEMENTATION.getStatus()));}
    else if (ex.getExceptionCode() == ExceptionCode.SERVER_ERROR) {return new ResponseEntity<>(ExceptionCode.SERVER_ERROR.getMessage(), HttpStatus.resolve(ExceptionCode.SERVER_ERROR.getStatus()));}
    else {return new ResponseEntity<>(ExceptionCode.INVALID.getMessage(), HttpStatus.resolve(ExceptionCode.INVALID.getStatus()));}
 }
}