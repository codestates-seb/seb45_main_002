import Header from "./component/Header";
import Main from "./component/Main";
import Nav from "./component/Nav";
import Hamberger from "./atom/Hamberger";
import { useState } from "react";

import useWindowSize from "./hook/useWindowSize";

function App() {
  const [page, setPage] = useState("");
  const [menu, setMenu] = useState(false);
  const size = useWindowSize();

  return (
    <>
      <Header menu={menu} setMenu={setMenu} setPage={setPage} />
      {size.width < 1040 ? null : <Nav setPage={setPage} />}
      {menu ? (
        <Hamberger setPage={setPage} menu={menu} setMenu={setMenu} />
      ) : null}
      <Main page={page} setPage={setPage} />
    </>
  );
}
export default App;
