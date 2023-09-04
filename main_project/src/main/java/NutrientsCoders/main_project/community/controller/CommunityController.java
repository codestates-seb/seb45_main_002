package NutrientsCoders.main_project.community.controller;

import NutrientsCoders.main_project.community.dto.CommunityMapper;
import NutrientsCoders.main_project.community.dto.CommunityPatchDto;
import NutrientsCoders.main_project.community.dto.CommunityPostDto;
import NutrientsCoders.main_project.community.dto.CommunityResponseDto;
import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.service.CommunityService;
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
    public CommunityController(CommunityService communityService, CommunityMapper communityMapper) {
        this.communityService = communityService;
        this.communityMapper = communityMapper;
    }
    /** 게시글 등록 **/
    @PostMapping
    public ResponseEntity<CommunityResponseDto> postCommunity(@RequestBody CommunityPostDto communityPostDto){
        Community community = communityService.createCommunity(communityMapper.communityPostDtoToCommunity(communityPostDto));
        CommunityResponseDto response = communityMapper.communityToCommunityResponseDto(community);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
    /** 게시글 수정 **/
    @PatchMapping("/{community-id}")
    public ResponseEntity<CommunityResponseDto> patchCommunity(@PathVariable("community-id") @Positive long communityId,
                                                               @RequestBody CommunityPatchDto communityPatchDto){
        communityPatchDto.setCommunityId(communityId);
        Community community = communityService.updateCommunity(communityMapper.communityPatchDtoToCommunity(communityPatchDto));
        CommunityResponseDto response = communityMapper.communityToCommunityResponseDto(community);
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
    public ResponseEntity<CommunityResponseDto> getCommunity(@PathVariable("community-id") @Positive long communityId){
        Community community = communityService.findCommunity(communityId);
        CommunityResponseDto response = communityMapper.communityToCommunityResponseDto(community);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    /** 게시글 삭제 **/
    @DeleteMapping("/{community-id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable("community-id") @Positive long communityId){
        communityService.deleteCommunity(communityId);
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
}
