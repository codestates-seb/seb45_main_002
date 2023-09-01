package NutrientsCoders.main_project.communitycomment.controller;

import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentMapper;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPostDto;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentResponseDto;
import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.service.CommunityCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/communitycomment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommunityCommentController {
    private final CommunityCommentService communityCommentService;
    private final CommunityCommentMapper communityCommentMapper;

    public CommunityCommentController(CommunityCommentService communityCommentService, CommunityCommentMapper communityCommentMapper) {
        this.communityCommentService = communityCommentService;
        this.communityCommentMapper = communityCommentMapper;
    }

    /** 댓글 등록 **/
    @PostMapping
    public ResponseEntity<CommunityCommentResponseDto> postCommunityComment(@RequestBody CommunityCommentPostDto communityCommentPostDto){
        CommunityComment communityComment = communityCommentService.createCommunityComment(communityCommentMapper.communityCommentPostDtoToComment(communityCommentPostDto));
        CommunityCommentResponseDto response = communityCommentMapper.communityCommentResponseDtoToComment(communityComment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
