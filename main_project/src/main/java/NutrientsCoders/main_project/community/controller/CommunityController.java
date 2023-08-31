package NutrientsCoders.main_project.community.controller;

import NutrientsCoders.main_project.community.dto.CommunityMapper;
import NutrientsCoders.main_project.community.dto.CommunityPatchDto;
import NutrientsCoders.main_project.community.dto.CommunityPostDto;
import NutrientsCoders.main_project.community.dto.CommunityResponseDto;
import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.service.CommunityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

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
}
