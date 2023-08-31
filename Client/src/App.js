import Header from "./component/Header";
import Nav from "./component/Nav";
import Main from "./component/Main";
import ModalComponent from "./atom/GlobalModal";
import useModalStore from "./store/modalStore";

const App = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};
export default App;
