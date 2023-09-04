import { useState } from "react";
import {useNavigate} from "react-router-dom"

import axios from "axios"
import { styled } from "styled-components";

import style from "../style/style"

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  &>*{
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width} 0;
    padding: ${style.layout.narrowMargin.height/2} ${style.layout.narrowMargin.width/2};
  }
  &>div{
    height: ${style.layout.narrowMargin.height};
    margin: 3px; padding: 0;
    font-size: xx-small;
    color: rgb(125, 0, 0);
  }
  &>button{
    margin: 0 ${style.layout.narrowMargin.width} ${style.layout.narrowMargin.height};
  }
`

const SignUpForm = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    errMsg: ""
  })

  const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  const errMsg=()=>{
    if(!emailRegExp.test(form.email) || form.email===""){
      setForm({...form,errMsg: "이메일이 형식에 맞지 않습니다."})
    }
    else if(form.password.length<5){
      setForm({...form,errMsg: "비밀번호는 5자 이상이어야 합니다."})
    }
    else if(!passwordRegExp.test(form.password)){
      setForm({...form,errMsg: "비밀번호는 알파벳과 숫자로 이루어져야 합니다."})
    }
    else{setForm({...form,errMsg: ""})}
  }
  const createAccount=()=>{
    if(emailRegExp.test(form.email)&&passwordRegExp.test(form.password)){
      axios.post("https://d9f8-14-37-234-174.ngrok-free.app/login/create",{
        nickname: form.email.slice(0,form.email.indexOf("@")),
        email: form.email,
        password: form.password
      })
      .then(res=>navigate("/pageswitch/mypage"))
      .catch(err=>console.log(err, "회원가입에 실패하였습니다."))
    }
    else{errMsg();}
  }
  return (
    <SignUpFormContainer>
      <input type="email" placeholder="E-mail" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
      <div>{form.errMsg}</div>
      <button onClick={createAccount}>가입하기</button>
    </SignUpFormContainer>
  );
};
export default SignUpForm;
