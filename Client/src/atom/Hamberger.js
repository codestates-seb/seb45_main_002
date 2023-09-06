import { Link } from "react-router-dom";
import { styled } from "styled-components";

import style from "../style/style";

const MenuContainer = styled.article`
  position: absolute;
  display: flex;
  justify-content: center;
  top: ${style.layout.header.height};
  left: 0;
  width: ${style.layout.maxWidth};
  height: ${style.layout.maxHeight};
  background-color: rgba(125,125,125,0.5);
  padding-top: ${style.layout.narrowMargin.height};
  z-index: 999;
`

function Hamberger(){

  return(
    <MenuContainer>
      <Link to="/"><img height={style.layout.header.height} alt="serch" src="https://media.discordapp.net/attachments/1144143589740400680/1146772585284116530/Frame_1.png?width=116&height=116"></img></Link>
      <Link to="/"><img height={style.layout.header.height} alt="home" src="https://media.discordapp.net/attachments/1144143589740400680/1146772585548349542/Frame_2.png?width=116&height=116"></img></Link>
      <Link to="/mypage"><img height={style.layout.header.height} alt="mypage" src="https://media.discordapp.net/attachments/1144143589740400680/1146772585787445348/Frame_3.png?width=116&height=116"></img></Link>
      <Link to="/"><img height={style.layout.header.height} alt="comunity" src="https://media.discordapp.net/attachments/1144143589740400680/1146772586051674152/Frame_4.png?width=116&height=116"></img></Link>
      <Link to="/"><img height={style.layout.header.height} alt="chat" src="https://media.discordapp.net/attachments/1144143589740400680/1146772586496262275/Frame_5.png?width=116&height=116"></img></Link>
    </MenuContainer>
  )
}
export default Hamberger;