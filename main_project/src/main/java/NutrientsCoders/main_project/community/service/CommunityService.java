package NutrientsCoders.main_project.community.service;

import NutrientsCoders.main_project.Analysis.service.AnalysisService;
import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.repository.CommunityRepository;

import NutrientsCoders.main_project.dailymeal.repository.DailyMealRepository;
import NutrientsCoders.main_project.dailymeal.service.DailyMealService;
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
    private final DailyMealService dailyMealService;
    private final AnalysisService analysisService;

    public CommunityService(CommunityRepository communityRepository, MemberRepository memberRepository, DailyMealService dailyMealService, AnalysisService analysisService) {
        this.communityRepository = communityRepository;
        this.memberRepository = memberRepository;
        this.dailyMealService = dailyMealService;
        this.analysisService = analysisService;
    }

    /** 리포지토리에 데이터를 저장하는 메서드 **/

    public Community createCommunity(Community community, long memberId){
        community.setMember(memberRepository.findByMemberId(memberId));
        // 선택한 식단으로 저장 띄우기
        community.setDailyMeal(dailyMealService.findByDailyMeal(community.getDailyMeal().getDailyMealId(),memberId));
        return communityRepository.save(community);
    }

    /** 리포지토리에 수정한 데이터를 저장하는 메서드 **/
    public Community updateCommunity(Community community,long memberId){
        try {
            Community findCommunityId = communityRepository.findById(community.getCommunityId()).orElse(null);
            if(findCommunityId.getMember().getMemberId() == memberId){
            findCommunityId.setCommunityTitle(community.getCommunityTitle());
            findCommunityId.setCommunityContent(community.getCommunityContent());
            }
            return communityRepository.save(findCommunityId);
        } catch (NullPointerException e){
            log.warn("null occurred somewhere",e.getCause());
            throw e;
        } catch (LogicException e){
            log.error(e.getExceptionCode().getMessage());
            throw e;
        }
    }
    /** 리포지토리에서 전체 게시글 데이터를 가져오는 메서드 **/
    public Page<Community> findCommunity(int page,int size){
        return communityRepository.findAll(PageRequest.of(page,size, Sort.by("communityId").descending()));
    }
    /** 리포지토리에서 게시글을 선택해 데이터를 가져오는 메서드 **/
    public Community findCommunity(long communityId){
        Community findIdCommunity = communityRepository.findById(communityId).orElse(null);
        findIdCommunity.setMember(memberRepository.findByMemberId(findIdCommunity.getMember().getMemberId()));
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
    public Community recommendCommunity(long communityId,long memberId){
        Community findCommunityId = communityRepository.findById(communityId).orElse(null);
        if(findCommunityId.isMemberId(memberId) == false) {
            findCommunityId.addMembers(memberId);
            findCommunityId.setRecommendationCount(findCommunityId.incrementRecommendationCount());
            findCommunityId.setCommunityLike(1);
            return communityRepository.save(findCommunityId);
        }else {
            findCommunityId.getLikeMembers().remove(memberId);
            findCommunityId.setRecommendationCount(findCommunityId.decrementRecommendationCount());
            findCommunityId.setCommunityLike(0);
        }
        return communityRepository.save(findCommunityId);
    }
}