package NutrientsCoders.main_project.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PagedResponse<T> {
  private List<T> content;
  private long totalElements;
  private int totalPages;
  private boolean last;
  
}
