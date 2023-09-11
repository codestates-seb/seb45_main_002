package NutrientsCoders.main_project.communitycomment.controller;

import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentMapper;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPatchDto;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPostDto;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentResponseDto;
import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.service.CommunityCommentService;
import NutrientsCoders.main_project.utils.TokenChanger;
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
    private final TokenChanger tokenChanger;

    public CommunityCommentController(CommunityCommentService communityCommentService, CommunityCommentMapper communityCommentMapper, TokenChanger tokenChanger) {
        this.communityCommentService = communityCommentService;
        this.communityCommentMapper = communityCommentMapper;
        this.tokenChanger = tokenChanger;
    }

    /** 댓글 등록 **/
    @PostMapping
    public ResponseEntity<CommunityCommentResponseDto> postCommunityComment(@RequestHeader("Authorization") String token,@RequestBody CommunityCommentPostDto communityCommentPostDto){
        Long memberId = tokenChanger.getMemberId(token);
        communityCommentPostDto.setCommunityId(communityCommentPostDto.getCommunityId());
        CommunityComment communityComment = communityCommentService.createCommunityComment(communityCommentPostDto,memberId);
        CommunityCommentResponseDto response = communityCommentMapper.communityCommentResponseDtoToComment(communityComment);
        response.setCommunityId(communityCommentPostDto.getCommunityId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    /** 댓글 수정 **/
    @PatchMapping("/{communitycomment-id}")
    public ResponseEntity<CommunityCommentResponseDto> patchCommunityComment(@RequestHeader("Authorization") String token,@PathVariable("communitycomment-id") @Positive long communitycommentId,
                                                                            @RequestBody CommunityCommentPatchDto communityCommentPatchDto){
        Long memberId = tokenChanger.getMemberId(token);
        communityCommentPatchDto.setCommunityCommentId(communitycommentId);
        CommunityComment communityComment = communityCommentService.updateCommunityComment(communityCommentMapper.communityCommentPatchDtoToComment(communityCommentPatchDto),memberId);
        CommunityCommentResponseDto response = communityCommentMapper.communityCommentResponseDtoToComment(communityComment);
        response.setCommunityId(communityCommentPatchDto.getCommunityId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    /** 댓글 삭제**/
    @DeleteMapping("/{communitycomment-id}")
    public ResponseEntity<Void> deleteCommunityComment(@RequestHeader("Authorization") String token,@PathVariable("communitycomment-id") @Positive long communitycommentId){
        Long memberId = tokenChanger.getMemberId(token);
        communityCommentService.deleteCommunityComment(communitycommentId,memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
