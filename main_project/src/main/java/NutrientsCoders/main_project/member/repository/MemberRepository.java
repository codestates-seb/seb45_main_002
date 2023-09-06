package NutrientsCoders.main_project.member.repository;

import NutrientsCoders.main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findOptionalByEmail (String email);
    Member findByEmail (String email);
    Member findByMemberId (Long memberId);

    Member findByNickname (String nickname);
}
