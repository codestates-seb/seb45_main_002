package NutrientsCoders.main_project.communitycomment.service;

import NutrientsCoders.main_project.community.repository.CommunityRepository;
import NutrientsCoders.main_project.communitycomment.dto.CommunityCommentPostDto;
import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import NutrientsCoders.main_project.communitycomment.repository.CommunityCommentRepository;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.repository.MemberRepository;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CommunityCommentService {
    private final CommunityCommentRepository communityCommentRepository;
    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;

    public CommunityCommentService(CommunityCommentRepository communityCommentRepository, CommunityRepository communityRepository, MemberRepository memberRepository) {
        this.communityCommentRepository = communityCommentRepository;
        this.communityRepository = communityRepository;
        this.memberRepository = memberRepository;
    }

    /** 댓글 생성 메서드 **/
    public CommunityComment createCommunityComment(CommunityCommentPostDto communityCommentPostDto,Long memberId){
        CommunityComment comment = new CommunityComment();
//        comment.setMember(memberRepository.findByMemberId(memberId));
        comment.setMemberId(memberId);
        comment.setCommunityCommentContent(communityCommentPostDto.getCommunityCommentContent());
        comment.setCommunity(communityRepository.findByCommunityId(communityCommentPostDto.getCommunityId()));
        return communityCommentRepository.save(comment);
    }
    /** 댓글 수정 메서드 **/
    public CommunityComment updateCommunityComment(CommunityComment communityComment,long memberId){
        try {
            CommunityComment findCommunityComment = communityCommentRepository.findById(communityComment.getCommunityCommentId()).orElse(null);
            if(findCommunityComment.getMemberId() == memberId){
            findCommunityComment.setCommunityCommentContent(communityComment.getCommunityCommentContent());}
            return communityCommentRepository.save(findCommunityComment);
        } catch (NullPointerException e){
            log.warn("null occurred somewhere",e.getCause());
            throw e;
        } catch (LogicException e){
            log.error(e.getExceptionCode().getMessage());
            throw e;
        }
    }
    /** 댓글 삭제 메서드 **/
    public void deleteCommunityComment(long communityCommentId,Long memberId){
        try {
            Optional<CommunityComment> optionalCommunity = communityCommentRepository.findById(communityCommentId);
            optionalCommunity.orElseThrow(()->
                    new LogicException(ExceptionCode.COMMENT_NOT_FOUND));
            if(optionalCommunity.get().getMemberId() == memberId){
                communityCommentRepository.deleteById(communityCommentId);}
        } catch (NullPointerException e){
            log.warn("null occurred somewhere",e.getCause());
            throw e;
        }catch (LogicException e){
            log.error(e.getExceptionCode().getMessage());
            throw e;
        }
    }
}


