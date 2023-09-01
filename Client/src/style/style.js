const style = {
  layout: {
    maxWidth: window.innerWidth,
    realWidth: window.innerWidth - (window.innerWidth / 8) * 2,
    maxHeight: window.innerHeight,
    sideMargin: window.innerWidth / 8,
    wideMargin: {
      width: (window.innerWidth - (window.innerWidth / 8) * 2) / 20,
      height: window.innerHeight / 40,
    },
    narrowMargin: {
      width: (window.innerWidth - (window.innerWidth / 8) * 2) / 20 / 2,
      height: window.innerHeight / 40 / 2,
    },
    header: {
      height: window.innerHeight / 16,
    },
    main: {
      width: (window.innerWidth / 4) * 3,
      height:
        window.innerHeight - window.innerHeight / 16 - window.innerHeight / 40,
    },
    sidebar: {
      width:
        window.innerWidth / 8 / 3 -
        (window.innerWidth - ((window.innerWidth / 8) * 2) / 20),
      icon: {
        height: window.innerHeight / 16 - window.innerHeight / 40 / 2,
      },
    },
  },
};
export default style;

// PC버전 총 넓이:
// 기기에 맞춤 => pc버전 예시, 1440px

// 양 옆 공백(1개 기준):
// 총 넓이/8 => pc버전 예시, 1440/8 = 180px

// 실 사용 넓이:
// 총 넓이-(양 옆 공백*2) => pc버전 예시, 1440-(180*2) = 1080px

// PC버전 총 높이:
// 기기에 맞춤 => pc버전 예시, 1024px

// 헤더 높이:
// 총 높이/16 => pc버전 예시, 1024/16 = 64px

// 헤더 햄버거:
// 넓이: 공백/3-(연관있는넓이/2) => pc버전 예시, 180/3-(27/2) = 46.5px
// 높이: 헤더 높이-(연관있는높이/2) => pc버전 예시, 64-(25.6/2) = 51.2px

// 헤더 로고:
// 넓이: 햄버거넓이*3 => pc버전 예시, 139.5px
// 높이: 햄버거 높이

// 헤더 프로필:
// 넓이: 햄버거 넓이
// 높이: 햄버거 높이

// 헤더 로그인/로그아웃/회원가입 버튼:
// 넓이: 햄버거 넓이+(햄버거 넓이/5*2) => pc버전 예시, 46.5+(46.5/5*2) = 65.1px
// 높이: 햄버거 높이

// 제목:
// 높이: 총 높이 => pc버전 예시, 1024/16 = 64px
// 글자 크기: 높이/8*5 => pc버전 예시, 64/8*5 = 40px

// 연관이 없을 경우or넓은 간격 (헤더와 메인, 아티클과 아티클 등)

// 높이 간격:
// 총 높이/20 => pc버전 예시, 1024/20 = 51.2px

// 넓이 간격:
// 실 넓이/20 => pc버전 경우, 1080/20 = 54px

// 연관이 있을 경우or좁은 간격 (제목과 내용, 섹션과 섹션 등)

// 높이 간격:
// 연관없는 높이/2 => pc버전 예시, 51.2/2 = 25.6px

// 넓이 간격:
// 연관없는 넓이/2 => pc버전 예시, 54/2 = 27px

// 내용이 아닌 경우, 제목들만 있는 경우 (메인 페이지의 4개 목록같은 경우)

// 각 제목의 높이:
// (총 높이-헤더 높이-(간격갯수*연관없는 높이간격))/제목갯수 => pc버전 예시, (1024-51.2-(5*51.2))/4 = 179.2px

// 각 제목의 높이 간격:
// 연관없는 높이간격

// 각 제목의 넓이:
// 디자인에 맞게

// 각 제목의 넓이 간격:
// 디자인에 맞게

// 사이드바 (좌측 공백 속에 넣기)
// 넓이: 공백/3-(연관있는 넓이) => pc버전 예시, 60-(27) = 33px
// 아이콘 1개 당 높이: 헤더 높이-연관있는높이 => pc버전 예시, 64-25.6 = 38.4px

// 기타 로그인과 회원가입 버튼 사이 넓이, 사이드바 아이콘의 패딩 등 세세한 부분은 만드는 이의 재량껏
