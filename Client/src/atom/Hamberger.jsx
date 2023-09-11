import { useState } from "react";
import { styled } from "styled-components";

import style from "../style/style";

function Button(){

  const MenuContainer = styled.article`
    position: absolute;
    z-index: 999;
    top: ${style.layout.header.height+style.layout.narrowMargin.height};
    left: ${style.layout.narrowMargin.width}; right: ${style.layout.narrowMargin.width};
  `
  const MenuNav = styled.nav`
    display: flex;
    justify-content: center;
  `

  const [menuOn, setMenu] = useState(false)

  return(
    <i className="fa-solid fa-bars" onClick={()=>setMenu(!menuOn)}>
      <MenuContainer>
        <MenuNav>
          <img alt="serch" src="https://media.discordapp.net/attachments/1144143589740400680/1146772585284116530/Frame_1.png?width=116&height=116"></img>
          <img alt="home" src="https://media.discordapp.net/attachments/1144143589740400680/1146772585548349542/Frame_2.png?width=116&height=116"></img>
          <img alt="mypage" src="https://media.discordapp.net/attachments/1144143589740400680/1146772585787445348/Frame_3.png?width=116&height=116"></img>
          <img alt="comunity" src="https://media.discordapp.net/attachments/1144143589740400680/1146772586051674152/Frame_4.png?width=116&height=116"></img>
          <img alt="chat" src="https://media.discordapp.net/attachments/1144143589740400680/1146772586496262275/Frame_5.png?width=116&height=116"></img>
        </MenuNav>
      </MenuContainer>
    </i>
  )
}
export default Button;
