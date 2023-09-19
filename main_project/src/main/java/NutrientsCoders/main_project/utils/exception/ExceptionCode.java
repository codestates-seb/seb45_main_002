package NutrientsCoders.main_project.utils.exception;

import lombok.Getter;
@Getter

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not found..."),
    COMMUNITY_NOT_FOUND(404,"Community Not found"),
    COMMENT_NOT_FOUND(404,"Comment Not found"),
    USER_EXISTS(409, "Member Already exists!"),
    DATE_EXISTS(409, "Date Already exists!"),
    MEAL_ALREADY_FULL(409, "DailyMeal already full"),
    CALORIE_TOO_LOW(409,"The calorie input is too low"),
    DAILYMEAL_EMPTY(409,"DailyMeal is Empty"),
    BMI_NOT_FOUND(409,"BMI should be calculated beforehand."),
    POST_NOT_FOUND(404, "Post not found..."),
    FOOD_NOT_FOUND(404, "food not found..."),
    EACHMEAL_NOT_FOUND(404, "EachMeal not found..."),
    DAILYMEAL_NOT_FOUND(404, "DailyMeal not found..."),
    ANALYSIS_NOT_FOUND(404, "AnalysisInfo not found..." ),
    CANNOT_APPLY(403, "can not change, check your conditions"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    SERVER_ERROR(500, "SERVER ERROR !!!"),
    INVALID(400, "Invalid status, check your request"),
    NEED_REFRESH_TOKEN(400,"You need a refresh token.");

    private final int status;

    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

