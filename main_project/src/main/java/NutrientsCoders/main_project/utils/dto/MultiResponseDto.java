package NutrientsCoders.main_project.utils.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private final List<T> data;
    private final PageInfo pageInfo;
    public MultiResponseDto(List<T> data, Page<T> page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}