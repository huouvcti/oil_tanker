import React, { useState, useEffect, useRef, RefObject } from 'react';
import axios from 'axios';

import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';



import '../../styles/mobile/info.scss';




const RegistInfo = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate()



  return (

    <div className='mobile_regitInfo'>
        <div className='title'>k-marintraffic 선박 위치 모니터링</div>

        <div className='content'>
            <h1>선박 정보</h1>

            <img src="https://i.namu.wiki/i/7jeVH_6qCK1ARphL-QXYaKMHRtJFVGN6wioSM6osgORavCV42-iwKWp_4hmvfxy9VToDHRk13315si8KsWZPpg.webp" alt="" />

            <ul>
                <li>ID: </li>
                <li>선박 이름: </li>
                <li>선박 정보: </li>
                <li>선박 정보: </li>
                <li>선박 정보: </li>
                <li>선박 정보: </li>
            </ul>

            <button>정보 수정</button>
        </div>
        
    </div>
  );
};

export default RegistInfo;