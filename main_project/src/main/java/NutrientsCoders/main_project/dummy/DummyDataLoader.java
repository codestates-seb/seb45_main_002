package NutrientsCoders.main_project.dummy;

import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class DummyDataLoader implements CommandLineRunner {

  private final MemberRepository memberRepository;

  @Override
  public void run(String... args) throws Exception {
//    System.out.println("더미를 생성합니다!");
//    Member member1 = new Member((long)1, "hgd@gmail.com","123123","홍길동",null,"F",180,68,50,32F,null, LocalDateTime.now());
//    Member member2 = new Member("hgd2@gmail.com");
//    Member member3 = new Member("hgd3@gmail.com");


    // 더미 데이터 저장
//    memberRepository.save(member1);
//    memberRepository.save(member2);
//    memberRepository.save(member3);

  }
}
