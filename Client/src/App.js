import Header from "./component/Header";
import Nav from "./component/Nav";
import Main from "./component/Main";

import style from "./style/style";

function App() {
  return (
    <div>
      <Header />
      {style.layout.maxWidth < 768 ? null : <Nav />}
      <Main />
    </div>
  );
}
export default App;
