const style = {
  layout: {
    maxWidth: window.innerWidth,
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
  color: {
    basic: {
      darkgoldenrod: "rgb(184,134,11)",
      darkgoldenrod1: "rgb(255,185,15)",
      darkgoldenrod2: "rgb(238,173,14)",
      darkgoldenrod3: "rgb(205,149,12)",
      darkgoldenrod4: "rgb(139,101,8)",
      darkgray: "rgb(169,169,169)",
      darkgreen: "rgb(0,100,0)",
      darkgrey: "rgb(169,169,169)",
      darkorange: "rgb(255,140,0)",
      darkorange1: "rgb(255,127,0)",
      darkorange2: "rgb(238,118,0)",
      darkorange3: "rgb(205,102,0)",
      darkorange4: "rgb(139,69,0)",
      darkorchid: "rgb(153,50,204)",
      darkorchid1: "rgb(191,62,255)",
      darkorchid2: "rgb(178,58,238)",
      darkorchid3: "rgb(154,50,205)",
      darkorchid4: "rgb(104,34,139)",
      darkred: "rgb(139,0,0)",
      darkslategray: "rgb(47,79,79)",
      darkslategray1: "rgb(151,255,255)",
      darkslategray2: "rgb(141,238,238)",
      darkslategray3: "rgb(121,205,205)",
      darkslategray4: "rgb(82,139,139)",
      darkslategrey: "rgb(47,79,79)",
      darkviolet: "rgb(148,0,211)",
      deeppink: "rgb(255,20,147)",
      deeppink1: "rgb(255,20,147)",
      deeppink2: "rgb(238,18,137)",
      deeppink3: "rgb(205,16,118)",
      deeppink4: "rgb(139,10,80)",
      dimgray: "rgb(105,105,105)",
      dimgrey: "rgb(105,105,105)",
      gold: "rgb(255,215,0)",
      gold1: "rgb(255,215,0)",
      gold2: "rgb(238,201,0)",
      gold3: "rgb(205,173,0)",
      gold4: "rgb(139,117,0)",
      ivory: "rgb(255,255,240)",
      ivory1: "rgb(255,255,240)",
      ivory2: "rgb(238,238,224)",
      ivory3: "rgb(205,205,193)",
      ivory4: "rgb(139,139,131)",
      mistyrose: "rgb(255,228,225)",
      mistyrose1: "rgb(255,228,225)",
      mistyrose2: "rgb(238,213,210)",
      mistyrose3: "rgb(205,183,181)",
      mistyrose4: "rgb(139,125,123)",
      navy: "rgb(0,0,128)",
      navyblue: "rgb(0,0,128)",
      lightcoral: "rgb(240,128,128)",
      lightgoldenrod: "rgb(238,221,130)",
      lightgoldenrod1: "rgb(255,236,139)",
      lightgoldenrod2: "rgb(238,220,130)",
      lightgoldenrod3: "rgb(205,190,112)",
      lightgoldenrod4: "rgb(139,129,76)",
      lightgray: "rgb(211,211,211)",
      lightgrey: "rgb(211,211,211)",
      lightpink: "rgb(255,182,193)",
      lightpink1: "rgb(255,174,185)",
      lightpink2: "rgb(238,162,173)",
      lightpink3: "rgb(205,140,149)",
      lightpink4: "rgb(139,95,101)",
      orange: "rgb(255,165,0)",
      orange1: "rgb(255,165,0)",
      orange2: "rgb(238,154,0)",
      orange3: "rgb(205,133,0)",
      orange4: "rgb(139,90,0)",
      orangered: "rgb(255,69,0)",
      orangered1: "rgb(255,69,0)",
      orangered2: "rgb(238,64,0)",
      orangered3: "rgb(205,55,0)",
      orangered4: "rgb(139,37,0)",
      peachpuff: "rgb(255,218,185)",
      peachpuff1: "rgb(255,218,185)",
      peachpuff2: "rgb(238,203,173)",
      peachpuff3: "rgb(205,175,149)",
      peachpuff4: "rgb(139,119,101)",
      pink: "rgb(255,192,203)",
      pink1: "rgb(255,181,197)",
      pink2: "rgb(238,169,184)",
      pink3: "rgb(205,145,158)",
      pink4: "rgb(139,99,108)",
      purple: "rgb(160,32,240)",
      purple1: "rgb(155,48,255)",
      purple2: "rgb(145,44,238)",
      purple3: "rgb(125,38,205)",
      purple4: "rgb(85,26,139)",
      red: "rgb(255,0,0)",
      red1: "rgb(255,0,0)",
      red2: "rgb(238,0,0)",
      red3: "rgb(205,0,0)",
      red4: "rgb(139,0,0)",
      rosybrown: "rgb(188,143,143)",
      rosybrown1: "rgb(255,193,193)",
      rosybrown2: "rgb(238,180,180)",
      rosybrown3: "rgb(205,155,155)",
      rosybrown4: "rgb(139,105,105)",
      slategray: "rgb(112,128,144)",
      slategray1: "rgb(198,226,255)",
      slategray2: "rgb(185,211,238)",
      slategray3: "rgb(159,182,205)",
      slategray4: "rgb(108,123,139)",
      slategrey: "rgb(112,128,144)",
      snow: "rgb(255,250,250)",
      snow1: "rgb(255,250,250)",
      snow2: "rgb(238,233,233)",
      snow3: "rgb(205,201,201)",
      snow4: "rgb(139,137,137)",
      tomato: "rgb(255,99,71)",
      tomato1: "rgb(255,99,71)",
      tomato2: "rgb(238,92,66)",
      tomato3: "rgb(205,79,57)",
      tomato4: "rgb(139,54,38)",
      violet: "rgb(238,130,238)",
      violetred: "rgb(208,32,144)",
      violetred1: "rgb(255,62,150)",
      violetred2: "rgb(238,58,140)",
      violetred3: "rgb(205,50,120)",
      violetred4: "rgb(139,34,82)",
      whitesmoke: "rgb(245,245,245)",
      yellow: "rgb(255,255,0)",
      yellow1: "rgb(255,255,0)",
      yellow2: "rgb(238,238,0)",
      yellow3: "rgb(205,205,0)",
      yellow4: "rgb(139,139,0)",
      yellowgreen: "rgb(154,205,50)"
    }
  }
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
