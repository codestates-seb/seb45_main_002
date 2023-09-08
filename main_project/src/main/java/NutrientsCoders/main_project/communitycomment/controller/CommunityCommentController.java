package NutrientsCoders.main_project.communitycomment.controller;

import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentMapper;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPatchDto;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPostDto;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentResponseDto;
import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.service.CommunityCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

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
        communityCommentPostDto.setCommunityId(communityCommentPostDto.getCommunityId());
        CommunityComment communityComment = communityCommentService.createCommunityComment(communityCommentPostDto);
        CommunityCommentResponseDto response = communityCommentMapper.communityCommentResponseDtoToComment(communityComment);
        response.setCommunityId(communityCommentPostDto.getCommunityId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    /** 댓글 수정 **/
    @PatchMapping("/{communitycomment-id}")
    public ResponseEntity<CommunityCommentResponseDto> patchCommunityComment(@PathVariable("communitycomment-id") @Positive long communitycommentId,
                                                                            @RequestBody CommunityCommentPatchDto communityCommentPatchDto){
        communityCommentPatchDto.setCommunityCommentId(communitycommentId);
        CommunityComment communityComment = communityCommentService.updateCommunityComment(communityCommentMapper.communityCommentPatchDtoToComment(communityCommentPatchDto));
        CommunityCommentResponseDto response = communityCommentMapper.communityCommentResponseDtoToComment(communityComment);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /** 댓글 삭제**/
    @DeleteMapping("/{communitycomment-id}")
    public ResponseEntity<Void> deleteCommunityComment(@PathVariable("communitycomment-id") @Positive long communitycommentId){
        communityCommentService.deleteCommunityComment(communitycommentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
