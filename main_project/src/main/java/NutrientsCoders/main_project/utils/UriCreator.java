package NutrientsCoders.main_project.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {

    public static URI create(String path,Long id){

        return UriComponentsBuilder
                .newInstance()
                .path(path + id)
                .buildAndExpand(id)
                .toUri();
    }

}
