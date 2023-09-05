package NutrientsCoders.main_project.utils.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member Not found..."),
    COMMUNITY_NOT_FOUND(404,"Community Not found"),
    COMMENT_NOT_FOUND(404,"Comment Not found"),
    USER_EXISTS(409, "Member Already exists!"),
    POST_NOT_FOUND(404, "Post not found..."),
    FOOD_NOT_FOUND(404, "food not found..."),
    EACHMEAL_NOT_FOUND(404, "EachMeal not found..."),
    DAILYMEAL_NOT_FOUND(404, "DailyMeal not found..."),
    CANNOT_APPLY(403, "can not change, check your conditions"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    SERVER_ERROR(500, "SERVER ERROR !!!"),
    INVALID(400, "Invalid status, check your request");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

