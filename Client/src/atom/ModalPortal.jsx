import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default ModalPortal;
