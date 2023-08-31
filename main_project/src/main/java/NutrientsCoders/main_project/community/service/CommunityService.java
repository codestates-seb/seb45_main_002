package NutrientsCoders.main_project.community.service;

import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.repository.CommunityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;

    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    /** 리포지토리에 데이터를 저장하는 메서드 **/
    public Community createCommunity(Community community){
        return communityRepository.save(community);
    }
    /** 리포지토리에 수정한 데이터를 저장하는 메서드 **/
    public Community updateCommunity(Community community){
        Community findCommunityId = communityRepository.findById(community.getCommunityId()).orElse(null);
        findCommunityId.setCommunityTitle(community.getCommunityTitle());
        findCommunityId.setCommunityContent(community.getCommunityContent());
        return communityRepository.save(findCommunityId);
    }
    /** 리포지토리에서 데이터를 전체 게시글을 가져오는 메서드 **/
    public Page<Community> findCommunity(int page,int size){
        return communityRepository.findAll(PageRequest.of(page,size, Sort.by("communityId").descending()));
    }

}
