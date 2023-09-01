package NutrientsCoders.main_project.communitycomment.service;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.repository.CommunityCommentRepository;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommunityCommentService {
    private final CommunityCommentRepository communityCommentRepository;
    public CommunityCommentService(CommunityCommentRepository communityCommentRepository) {
        this.communityCommentRepository = communityCommentRepository;
    }
    /** 댓글 생성 메서드 **/
    public CommunityComment createCommunityComment(CommunityComment communityComment){
        return communityCommentRepository.save(communityComment);
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


