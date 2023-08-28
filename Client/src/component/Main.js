import "./Main.css";

import Home from "../page/Home"
import MyPage from "../page/MyPage"
import TableAdd from "../page/TableAdd"



import {BrowserRouter, Routes, Route} from "react-router-dom";

function Main(){

  return(
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/tableadd" element={<TableAdd />}></Route>
          
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default Main;