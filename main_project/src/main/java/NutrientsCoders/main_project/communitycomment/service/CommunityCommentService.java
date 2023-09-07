package NutrientsCoders.main_project.communitycomment.service;

import NutrientsCoders.main_project.community.entity.Community;
import NutrientsCoders.main_project.community.repository.CommunityRepository;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPostDto;
import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.repository.CommunityCommentRepository;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommunityCommentService {
    private final CommunityCommentRepository communityCommentRepository;
    private final CommunityRepository communityRepository;

    public CommunityCommentService(CommunityCommentRepository communityCommentRepository, CommunityRepository communityRepository) {
        this.communityCommentRepository = communityCommentRepository;
        this.communityRepository = communityRepository;
    }

    /** 댓글 생성 메서드 **/
    public CommunityComment createCommunityComment(CommunityCommentPostDto communityCommentPostDto){
        CommunityComment comment = new CommunityComment();
        Community community = new Community();
        community.setAddCommunityCommentList(comment);
        comment.setCommunityCommentContent(communityCommentPostDto.getCommunityCommentContent());
        comment.setCommunity(communityRepository.findByCommunityId(communityCommentPostDto.getCommunityId()));
        return communityCommentRepository.save(comment);
    }
    /** 댓글 수정 메서드 **/
    public CommunityComment updateCommunityComment(CommunityComment communityComment){
        CommunityComment findCommunityComment = communityCommentRepository.findById(communityComment.getCommunityCommentId()).orElse(null);
        findCommunityComment.setCommunityCommentContent(communityComment.getCommunityCommentContent());
        return communityCommentRepository.save(findCommunityComment);
    }
    /** 댓글 삭제 메서드 **/
    public void deleteCommunityComment(long communityCommentId){
        Optional<CommunityComment> optionalCommunity = communityCommentRepository.findById(communityCommentId);
        optionalCommunity.orElseThrow(()->
                    new LogicException(ExceptionCode.COMMENT_NOT_FOUND));
        communityCommentRepository.deleteById(communityCommentId);
    }

}


