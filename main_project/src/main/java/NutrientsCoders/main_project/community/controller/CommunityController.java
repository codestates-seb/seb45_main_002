package NutrientsCoders.main_project.community.controller;

import NutrientsCoders.main_project.community.dto.*;
import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.service.CommunityService;
import NutrientsCoders.main_project.utils.TokenChanger;
import NutrientsCoders.main_project.utils.dto.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/community")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommunityController {
    private final CommunityService communityService;
    private final CommunityMapper communityMapper;
    private final TokenChanger tokenChanger;

    public CommunityController(CommunityService communityService, CommunityMapper communityMapper, TokenChanger tokenChanger) {
        this.communityService = communityService;
        this.communityMapper = communityMapper;
        this.tokenChanger = tokenChanger;
    }

    /** 게시글 등록 **/

    @PostMapping
    public ResponseEntity<CommunityResponseDto> postCommunity(@RequestHeader("Authorization") String token, @RequestBody CommunityPostDto communityPostDto){
//        Community community = communityService.createCommunity(communityMapper.communityPostDtoToCommunity(communityPostDto), tokenChanger.getMemberId(token));
        Community community = communityService.createCommunity(communityPostDto, tokenChanger.getMemberId(token));
        CommunityResponseDto response = communityMapper.communityToCommunityResponseDto(community);
        response.setMemberId(tokenChanger.getMemberId(token));
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }



    /** 게시글 수정 **/
    @PatchMapping("/{community-id}")
    public ResponseEntity<CommunityResponseDto> patchCommunity(@PathVariable("community-id") @Positive long communityId,
                                                               @RequestHeader("Authorization") String token,
                                                               @RequestBody CommunityPatchDto communityPatchDto){
        Long memberId = tokenChanger.getMemberId(token);
        communityPatchDto.setCommunityId(communityId);
        Community community = communityService.updateCommunity(communityMapper.communityPatchDtoToCommunity(communityPatchDto),memberId);
        CommunityResponseDto response = communityMapper.communityToCommunityResponseDto(community);
        response.setMemberId(memberId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    /** 게시글 전체 조회 **/
    @GetMapping
    public ResponseEntity<MultiResponseDto<Community>> getAllCommunity(@RequestParam(name = "page", defaultValue = "0") int page,
                                                            @RequestParam(name = "size", defaultValue = "10") int size){
        Page<Community> pageCommunities = communityService.findCommunity(page-1,size);
        List<Community> communities = pageCommunities.getContent();
        return new ResponseEntity<>( new MultiResponseDto<>(communityMapper.communityToCommunityResponseDtos(communities),pageCommunities),
                HttpStatus.OK);
    }
    /** 게시글 선택 조회 **/
    @GetMapping("/{community-id}")
    public ResponseEntity<CommunityAllResponseDto> getCommunity(@PathVariable("community-id") @Positive long communityId){
        Community community = communityService.findCommunity(communityId);
        CommunityAllResponseDto response = communityMapper.communityToCommunityAllResponseDto(community);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    /** 게시글 삭제 **/
    @DeleteMapping("/{community-id}")
    public ResponseEntity<Void> deleteCommunity(@RequestHeader("Authorization") String token,@PathVariable("community-id") @Positive long communityId){
        Long memberId = tokenChanger.getMemberId(token);
        communityService.deleteCommunity(communityId,memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    /** 게시글 제목으로 검색 **/
    @GetMapping("/title-search")
    public ResponseEntity<MultiResponseDto<Community>> searchTitle(@RequestParam(name = "keyword")String keyword,
                                                            @RequestParam(name = "page" ,defaultValue = "0") @Positive int page,
                                                            @RequestParam(name = "size",defaultValue = "10") @Positive int size){
        Page<Community> pageCommunities = communityService.findTitleCommunity(keyword, page-1, size);
        //여기서 Content -> title 이다.
        List<Community> communities = pageCommunities.getContent();
        List<Community> resultCommunity = communityMapper.communityToCommunityResponseDtos(communities);
        return new ResponseEntity<>(new MultiResponseDto<>(resultCommunity,pageCommunities),HttpStatus.OK);
    }
     /** 게시글 추천 기능 **/
    @GetMapping("/recommendation/{community-id}")
    public ResponseEntity<CommunityResponseDto> recommendationCommunity(@PathVariable("community-id")@Positive long communityId,
                                                                        @RequestHeader("Authorization") String token) {
        Long memberId = tokenChanger.getMemberId(token);
        Community community = communityService.recommendCommunity(communityId, memberId);
        CommunityResponseDto response = communityMapper.communityToCommunityResponseDto(community);
        response.setMemberId(memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
