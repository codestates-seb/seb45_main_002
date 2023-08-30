//package com.preproject.seb_pre_15.dummy;
//
//import com.preproject.seb_pre_15.answer.entity.Answer;
//import com.preproject.seb_pre_15.answer.repository.AnswerRepository;
//import com.preproject.seb_pre_15.member.entity.Member;
//import com.preproject.seb_pre_15.member.repository.MemberRepository;
//import com.preproject.seb_pre_15.question.entity.Question;
//import com.preproject.seb_pre_15.question.repository.QuestionRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//더미생성용 클래스 입니다, 사용시 퀘스쳔 생성자를 주석해제해야 합니다
//@Component
//@AllArgsConstructor
//public class DummyDataLoader implements CommandLineRunner {
//
//  private final QuestionRepository questionRepository;
//  private final MemberRepository memberRepository;
//  private final AnswerRepository answerRepository;
//
//  @Override
//  public void run(String... args) throws Exception {
//
//    Member member1 = new Member("hgd@gmail.com");
//    Member member2 = new Member("hgd2@gmail.com");
//    Member member3 = new Member("hgd3@gmail.com");
//
//
//    // 더미 데이터 저장
//    memberRepository.save(member1);
//    memberRepository.save(member2);
//    memberRepository.save(member3);
//
//  }
//}
