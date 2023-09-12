package NutrientsCoders.main_project.community.repository;

import NutrientsCoders.main_project.community.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Long> {
    @Query("SELECT c FROM Community c WHERE LOWER(c.communityTitle) LIKE LOWER(CONCAT('%',:keyword,'%')) ORDER BY c.community_createdAt DESC")
    Page<Community> findByCommunityTitle(@Param("keyword")String keyword, Pageable pageable);
    @Query("SELECT c from Community c where c.communityId = :communityId")
    Community findByCommunityId(long communityId);

}
