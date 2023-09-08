package NutrientsCoders.main_project.community.service;

import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.repository.CommunityRepository;
import NutrientsCoders.main_project.communitycomment.repository.CommunityCommentRepository;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityCommentRepository communityCommentRepository;


    public CommunityService(CommunityRepository communityRepository, CommunityCommentRepository communityCommentRepository) {
        this.communityRepository = communityRepository;
        this.communityCommentRepository = communityCommentRepository;
    }

    /** 리포지토리에 데이터를 저장하는 메서드 **/
//    public Community createCommunity(Community community){
//        community.setCommunityCommentList(communityCommentRepository.findByCommunityComment(community.getCommunityId()));
//        // 커뮤니티 리스트
//        return communityRepository.save(community);
//    }
    /** 리포지토리에 수정한 데이터를 저장하는 메서드 **/
    public Community updateCommunity(Community community){
        Community findCommunityId = communityRepository.findById(community.getCommunityId()).orElse(null);
        findCommunityId.setCommunityTitle(community.getCommunityTitle());
        findCommunityId.setCommunityContent(community.getCommunityContent());
        return communityRepository.save(findCommunityId);
    }
    /** 리포지토리에서 전체 게시글 데이터를 가져오는 메서드 **/
    public Page<Community> findCommunity(int page,int size){
        return communityRepository.findAll(PageRequest.of(page,size, Sort.by("communityId").descending()));
    }
    /** 리포지토리에서 게시글을 선택해 데이터를 가져오는 메서드 **/
    public Community findCommunity(long communityId){
        Community findIdCommunity = communityRepository.findById(communityId).orElse(null);
        findIdCommunity.setCommunityViewCount(findIdCommunity.incrementViewCount());
        return communityRepository.save(findIdCommunity);
    }
    /** 리포지토리에서 게시글을 지우는 메서드 **/
    public void deleteCommunity(long communityId){
        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        optionalCommunity.orElseThrow(() ->
                new LogicException(ExceptionCode.COMMUNITY_NOT_FOUND));
        communityRepository.deleteById(communityId);
    }
    /** 게시글 선택 검색 로직 **/
    public Page<Community> findTitleCommunity(String keyword, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return communityRepository.findByCommunityTitle(keyword,pageable);
    }
    /** 게시글 추천 기능 **/
    public Community recommendCommunity(long communityId){
        Community findCommunityId = communityRepository.findById(communityId).orElse(null);
        if(findCommunityId.isCommunityLike()) {
             findCommunityId.setRecommendationCount(findCommunityId.incrementRecommendationCount());
             findCommunityId.setCommunityLike(false);
        }else {
            findCommunityId.setRecommendationCount(findCommunityId.decrementRecommendationCount());
            findCommunityId.setCommunityLike(true);
        }
        return communityRepository.save(findCommunityId);
    }
}
