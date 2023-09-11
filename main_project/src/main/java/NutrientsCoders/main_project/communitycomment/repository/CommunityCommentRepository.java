package NutrientsCoders.main_project.communitycomment.repository;

import NutrientsCoders.main_project.communitycomment.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment,Long> {
    List<CommunityComment> findByCommunityCommentId(long communityId);
}
