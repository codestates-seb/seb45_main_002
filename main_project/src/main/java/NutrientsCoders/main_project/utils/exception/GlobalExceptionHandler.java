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
    String message = "유효하지 않은 값입니다";
    return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
  }
  
  @ExceptionHandler(LogicException.class)
  public ResponseEntity<Object> handleCustomViolationException(LogicException ex) {
    ExceptionCode exceptionCode = ex.getExceptionCode();
    String message = exceptionCode.getMessage();
    HttpStatus status = HttpStatus.resolve(exceptionCode.getStatus());
    
    return new ResponseEntity<>(message, status);
  }
}
