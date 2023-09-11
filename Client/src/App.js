import Header from "./component/Header";
import Main from "./component/Main";
import Nav from "./component/Nav";
import Hamberger from "./atom/Hamberger";

import { useState } from "react";
import style from "./style/style";

function App() {
  const [page, setPage] = useState("");

  const [menu, setMenu] = useState(false);

  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
      {style.layout.maxWidth < 769 ? null : <Nav />}
      {menu ? <Hamberger setPage={setPage} /> : null}
      <Main page={page} setPage={setPage} />
    </>
  );
}
export default App;
