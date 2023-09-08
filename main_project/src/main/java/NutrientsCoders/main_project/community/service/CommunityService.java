package NutrientsCoders.main_project.community.service;

import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.repository.CommunityRepository;
import NutrientsCoders.main_project.member.repository.MemberRepository;
import NutrientsCoders.main_project.utils.exception.LogicException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;

    public CommunityService(CommunityRepository communityRepository, MemberRepository memberRepository) {
        this.communityRepository = communityRepository;
        this.memberRepository = memberRepository;
    }

    /** 리포지토리에 데이터를 저장하는 메서드 **/
    public Community createCommunity(Community community,long memberId){
        community.setMember(memberRepository.findByMemberId(memberId));
        return communityRepository.save(community);
    }
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
    public Community findCommunity(long communityId, long memberId){
        Community findIdCommunity = communityRepository.findById(communityId).orElse(null);
        findIdCommunity.setMember(memberRepository.findByMemberId(memberId));
        findIdCommunity.setCommunityViewCount(findIdCommunity.incrementViewCount());
        return communityRepository.save(findIdCommunity);
    }
    /** 리포지토리에서 게시글을 지우는 메서드 **/
    public void deleteCommunity(long communityId, long memberId){
        try {
            Community community = communityRepository.findByCommunityId(communityId);
            if(community.getMember().getMemberId() == memberId){
           communityRepository.deleteById(communityId);
        }
        } catch (NullPointerException e){
            log.warn("null occurred somewhere",e.getCause());
            throw e;
        }catch (LogicException e){
            log.error(e.getExceptionCode().getMessage());
            throw e;
        }
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
