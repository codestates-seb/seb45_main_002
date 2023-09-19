package NutrientsCoders.main_project.member.service;

import NutrientsCoders.main_project.member.dto.MemberDto;
import NutrientsCoders.main_project.member.dto.MemberResponseDto;
import NutrientsCoders.main_project.member.entity.Member;
import NutrientsCoders.main_project.member.repository.MemberRepository;
import NutrientsCoders.main_project.utils.AuthorityUtils;
import NutrientsCoders.main_project.utils.exception.ExceptionCode;
import NutrientsCoders.main_project.utils.exception.LogicException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service(value = "memberService")
@Slf4j
@Lazy
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;

    private final AuthorityUtils authorityUtils;

    public MemberServiceImpl(MemberRepository memberRepository,
                             PasswordEncoder encoder,
                             AuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.encoder = encoder;
        this.authorityUtils =  authorityUtils;
    }

    @Override
    public Member findMember(String email){

        return memberRepository.findByEmail(email);
    }

    @Override
    public Member createOAuth2Member(Member member){
        member.setCreatedAt(LocalDateTime.now());

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    @Override
    @Transactional
    public Member createMember(Member member) throws Exception {
        try {
            //이메일 검증
            verifyEmail(member.getEmail());

            //비밀번호 단방향 암호화
            String encryptPassword = encoder.encode(member.getPassword());
            member.setPassword(encryptPassword);

            //초기 설정
            member.setCreatedAt(LocalDateTime.now());

            List<String> roles = authorityUtils.createRoles(member.getEmail()) ;
            member.setRoles(roles);

            Member saveMember = memberRepository.save(member);
            return saveMember;
        }catch (NullPointerException e){
            log.warn("null occurred somewhere",e.getCause());
            throw e;
        }catch (LogicException e){
            log.error(e.getExceptionCode().getMessage());
            throw e;
        }

    }

    @Override
    @Transactional
    public Member additionMemberInfo(MemberDto.AddInfo addInfo) throws Exception {
        try {
            Member member = verifyMember(addInfo.getMemberId());

            Optional.of(addInfo.getHeight()).ifPresent(member::setHeight);
            Optional.of(addInfo.getWeight()).ifPresent(member::setWeight);
            Optional.of(addInfo.getGender()).ifPresent(member::setGender);
            Optional.of(addInfo.getAge()).ifPresent(member::setAge);
            Optional.of(addInfo.getActivity()).ifPresent(member::setActivity);

            MemberResponseDto.bmi checked = checkBmi(member.getMemberId());

            Optional.of(checked.getKcal()).ifPresent(member::setNeedKcal);
            Optional.of(checked.getBmi()).ifPresent(member::setBmi);

            return member;
        }catch (Exception e){
            log.error(e.getMessage());
            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean checkEmail(String email) throws Exception {
        return memberRepository.findOptionalByEmail(email).isEmpty();
    }

    @Transactional(readOnly = true)
    public Boolean checkPassword(String email,String password){
        Member member = memberRepository.findByEmail(email);

        return encoder.matches(password, member.getPassword());
    }

    @Override
    public Boolean login(MemberDto.Login login) throws Exception {
        return null;
    }

    @Override
    @Transactional
    public Member updateMember(Long memberId,MemberDto.Patch member) throws Exception {
        try {
            Member changeMember = verifyMember(memberId);

            Optional.ofNullable(member.getHeight()).ifPresent(changeMember::setHeight);
            Optional.ofNullable(member.getWeight()).ifPresent(changeMember::setWeight);
            Optional.ofNullable(member.getGender()).ifPresent(changeMember::setGender);
            Optional.ofNullable(member.getAge()).ifPresent(changeMember::setAge);
            Optional.ofNullable(member.getActivity()).ifPresent(changeMember::setActivity);
            Optional.ofNullable(member.getNickname()).ifPresent(changeMember::setNickname);
            Optional.ofNullable(member.getImageUrl()).ifPresent(changeMember::setImageUrl);

            MemberResponseDto.bmi checked = checkBmi(changeMember.getMemberId());

            Optional.ofNullable(checked.getKcal()).ifPresent(changeMember::setNeedKcal);
            Optional.ofNullable(checked.getBmi()).ifPresent(changeMember::setBmi);

            return memberRepository.save(changeMember);
        }catch (Exception e){
            log.warn("Throwable : "+e.getCause());
            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Member findMember(Long memberId) throws Exception {
        return verifyMember(memberId);
    }

    @Override
    @Transactional
    public void deleteMember(Long memberId) throws Exception {
        memberRepository.delete(findMember(memberId));
    }

    private void verifyEmail(String email){
        Optional<Member> member = memberRepository.findOptionalByEmail(email);
        if (member.isPresent())
            throw new LogicException(ExceptionCode.USER_EXISTS);
    }

    @Transactional(readOnly = true)
    public Member verifyMember(Long memberId){
        Optional<Member> member = memberRepository.findById(memberId);

        return member.orElseThrow(()->
                new LogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Override
    @Transactional
    public MemberResponseDto.bmi checkBmi(Long memberId) {
        Member member = verifyMember(memberId);

        int height = member.getHeight();
        int weight = member.getWeight();
        int gender = genderCalculate(member.getGender());
        int age = member.getAge();
        float activity = member.getActivity();

        float bmi = (float) (weight /((height/100.0)*(height/100.0)));
        float kcal = (float)(((10*weight)+(6.25*height)-(5*age)+gender)*activity+400);

        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        bmi = Float.parseFloat(decimalFormat.format(bmi));
        kcal = Float.parseFloat(decimalFormat.format(kcal));


        return new MemberResponseDto.bmi(bmi,kcal);
    }
    private int genderCalculate(String gender){
        if (gender.equals("M")){
            return 100;
        } else if (gender.equals("F")) {
            return -50;
        } else return -80;
    }
    public String findNickname(Long memberId){
        String nickname = memberRepository.findByMemberId(memberId).getNickname();
        return nickname;
    }
}
