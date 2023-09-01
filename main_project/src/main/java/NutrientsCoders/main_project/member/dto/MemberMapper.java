package NutrientsCoders.main_project.member.dto;

import NutrientsCoders.main_project.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostChanger(MemberDto.Post memberpost);

    MemberResponseDto.MyPage memberMypageChanger(Member member);

}
