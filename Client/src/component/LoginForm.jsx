import { useState } from "react";
import {useNavigate} from "react-router-dom"

import axios from "axios";

import { styled } from "styled-components";

import useZustand from "../zustand/Store";

import style from "../style/style"

const LoginContainer = styled.div`
  &>:last-child{
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
  }
`
const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  &>*{
    height: ${style.layout.header.height}; width: ${style.layout.main.width*2/3};
    margin: ${style.layout.narrowMargin.height} ${style.layout.narrowMargin.width};
    padding: ${style.layout.narrowMargin.height/2} ${style.layout.narrowMargin.width/2};
  }
  &>:nth-child(2){
    margin-bottom: ${style.layout.narrowMargin.height/2};
  }
  &>div{
    height: 0;
    margin: 0px; padding: 0;
    font-size: xx-small;
    color: rgb(125, 0, 0);
  }
  &>button{
    margin: ${style.layout.narrowMargin.height*3/2} ${style.layout.narrowMargin.width} ${style.layout.narrowMargin.height};
    background-color: rgb(255, 184, 47);
    font-weight: bolder;
    &:active{
      background-color: rgb(255, 222, 111);
    }
  }
`
const LoginForm = () => {

  const navigate = useNavigate()

  const setAccessToken = useZustand.useToken(state=>state.setAccessToken)

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
  const loginButton=(e)=>{
    e.preventDefault()
    if(emailRegExp.test(form.email)&&passwordRegExp.test(form.password)){
      axios.post("http://43.201.194.176:8080/login",{
        email: form.email,
        password: form.password
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        }
      }
      )
      .then(res=>{
        setAccessToken(localStorage.getItem("access_token"))
        window.location.reload()
      })
      .catch(err=>console.log(err+"실패했습니다."))
    }
    else{errMsg();}
  }
  
  function googleLoginButton(){
    window.location.href = "https://accounts.google.com/o/oauth2/auth?" +
    "client_id=999588881445-qssr877h8rnlnrq4fv6nfc7r0mg6fvtp.apps.googleusercontent.com&" +
    "redirect_uri=http://localhost:3000/&" +
    "response_type=token&" +
    "scope=" +
    "https://www.googleapis.com/auth/userinfo.email"
  }
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");
  function consoleLog(){
    axios.get("http://43.201.194.176:8080/auth",{
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
        'token': accessToken
        }
    })
    .then(res=>console.log(res+"JWT 발급 < 성공 > 입니다."))
    .catch(err=>console.log(err+"JWT 발급 < 실패 > 입니다."))
  }

  return (
    <LoginContainer>
      <LoginFormContainer>
        <input type="email" placeholder="E-mail" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
        <div>{form.errMsg}</div>
        <button onClick={loginButton}>LOGIN</button>
      </LoginFormContainer>
      <button onClick={googleLoginButton}>google login</button>
      <button onClick={consoleLog}>콘솔찍기</button>
    </LoginContainer>
  );
};
export default LoginForm;
