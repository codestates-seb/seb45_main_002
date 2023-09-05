package NutrientsCoders.main_project.member.controller;

import NutrientsCoders.main_project.member.dto.MemberDto;
import NutrientsCoders.main_project.member.dto.MemberMapper;
import NutrientsCoders.main_project.member.dto.MemberResponseDto;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.service.MemberService;
import NutrientsCoders.main_project.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("")
@Validated
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    @PostMapping("/login/check")
    public ResponseEntity<Member> checkEmail(@RequestBody MemberDto.email email) throws Exception {
        if (memberService.checkEmail(email.getEmail())){
            return new ResponseEntity<>(HttpStatus.OK);
        }else return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @PostMapping("/login/create")
    public ResponseEntity<Member> postMember(@RequestBody MemberDto.Post memberpost) throws Exception {
        try {
            Member member = memberService.createMember(memberMapper.memberPostChanger(memberpost));

            URI uri = UriCreator.create("/member/", member.getMemberId());

            return ResponseEntity.created(uri).build();
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/createinfo")
    public ResponseEntity<Member> postInfoMember(@RequestBody MemberDto.AddInfo memberinfo) throws Exception {
        Member member = memberService.additionMemberInfo(memberinfo);
        return ResponseEntity.ok(member);
    }

    @GetMapping("/mypage/{member-id}")
    public ResponseEntity<MemberResponseDto.MyPage> mypageMember(@PathVariable("member-id") Long memberId) throws Exception {
        MemberResponseDto.MyPage response =
                memberMapper.memberMypageChanger(memberService.findMember(memberId));

        return ResponseEntity.ok(response);
    }

    //login

    @PatchMapping("/mypage/{member-id}")
    public ResponseEntity<MemberResponseDto.MyPage> updateMember(@PathVariable("member-id")Long memberId ,
                                                                 @RequestBody MemberDto.Patch memberpatch) throws Exception {
        Member member = memberService.updateMember(memberId,memberpatch);
        MemberResponseDto.MyPage response = memberMapper.memberMypageChanger(member);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/mypage/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id")Long memberId) throws Exception {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity<MemberResponseDto.bmi> bmiMember(@PathVariable("member-id")Long memberId) throws Exception {

        MemberResponseDto.bmi response = memberService.checkBmi(memberId);

        return ResponseEntity.ok(response);
    }


}
