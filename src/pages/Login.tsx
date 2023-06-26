import React, { useState, useEffect, useRef, RefObject } from 'react';
import axios from 'axios';

import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';



import '../styles/login.scss';




const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()


    const [loginForm, setLoginForm] = useState({
        id: "",
        pw: ""
    });

    const loginFormChange = (e: any) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };


    const onClick_submitBtn = async (e: any) => {
        e.preventDefault();

        let loginMsg = document.getElementById("loginMsg");

        if(!loginForm.id) {
            loginMsg.style.opacity = "1";
            loginMsg.innerText = "! 아이디를 입력해주세요";
        } else if(!loginForm.pw) {
            loginMsg.style.opacity = "1";
            loginMsg.innerText = "! 비밀번호를 입력해주세요";
        } else {
            loginMsg.style.opacity = "0";
            try {
                const response = await axios.get(
                    "/api/loginAPI/login"
                );

                if(response.data){
                    setCookie("login", true)
                    navigate("/");
                }
    
                // console.log(markers)
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        

        
    }









  return (

    <div className='loginBackground'>
        <div className='loginTitle'>k-marintraffic - 선박 위치 모니터링</div>

        <div className='loginWrap'>
            <div className='login'>
                <div className='inputWrap'>
                    <label htmlFor="inputId" id="labelId">아이디</label>
                    <input type="text" id="inputId" name="id" value={loginForm.id} onChange={loginFormChange}/>
                </div>
                
                <div className='inputWrap'>
                    <label htmlFor="inputPw">비밀번호</label>
                    <input type="password" id="inputPw" name="pw" value={loginForm.pw}  onChange={loginFormChange}/>
                </div>

                <p id="loginMsg">! 아이디를 입력해주세요</p>
                

                <input type="submit" value="로그인" onClick={onClick_submitBtn} />
            </div>
            
        </div>
        
    </div>
  );
};

export default Login;