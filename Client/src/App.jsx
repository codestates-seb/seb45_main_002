import Header from "./component/Header";
import Main from "./component/Main";
import Nav from "./component/Nav";
import Hamberger from "./atom/Hamberger"

import { useState } from "react";

import style from "./style/style";

function App() {

  const [page, setPage] = useState("")

  const [menu, setMenu] = useState(false)

  return (
    <div>
<<<<<<< HEAD
      <Header menu={menu} setMenu={setMenu} />
      {style.layout.maxWidth < 769 ? null : <Nav />}
=======
      <Header menu={menu} setMenu={setMenu} setPage={setPage} />
      {style.layout.maxWidth < 769 ? null : <Nav setPage={setPage} />}
>>>>>>> devFE
      {menu? <Hamberger setPage={setPage} menu={menu} setMenu={setMenu} /> : null}
      <Main page={page} setPage={setPage} />
    </div>
  );
}
export default App;
