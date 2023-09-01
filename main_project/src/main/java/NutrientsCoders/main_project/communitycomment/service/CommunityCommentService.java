package NutrientsCoders.main_project.communitycomment.service;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.repository.CommunityCommentRepository;
import org.springframework.stereotype.Service;

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
}
