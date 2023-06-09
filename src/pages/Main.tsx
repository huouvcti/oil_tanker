import React, { useState, useEffect, useRef, RefObject } from 'react';

import Header from '../components/header/Header';

import SideBar from '../components/sideBar/SideBar';

import ECDIS from '../hooks/ECDIS';

import '../styles/main_E.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faFolder, faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { useInterval } from 'react-use';

import { loadPlayer } from 'rtsp-relay/browser'

import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';



const Clock = () => {

  const [date, setDate] = useState(() => new Date())
  const [dateFormat, setDateFormat] = useState("");

  useInterval(() => {
    setDate(new Date())

    let now = date;  // 현재 날짜 및 시간
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let dayOfWeek = week[now.getDay()];
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    setDateFormat(todayYear + '.' + todayMonth + '.' + todayDate + ' ' + dayOfWeek + ' '
      + hours + ' : ' + minutes + ' : ' + seconds);
  })



  return (
    <div className='currentTime'>
      {dateFormat}
    </div>
  );
};


declare global {
  interface Window {
    jsmpeg: any;
  }
}



const Main = () => {

  const { ECDIS_basic, ECDIS_add_marker, ECDIS_add_line, location_clear, zoom_in, zoom_out } = ECDIS();
    
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

    if(!cookies.login){
        navigate("/login");
    }


  const cctv_close = () => {
    document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap cctvWrap_";

  }



  useEffect(()=>{
    const client0 = new WebSocket('ws://ocean-gps.com:9000');
    const client1 = new WebSocket('ws://ocean-gps.com:9001');
    const client2 = new WebSocket('ws://ocean-gps.com:9002');
    // const client4 = new WebSocket('ws://localhost:9004');

    const cctv_view = document.getElementsByClassName('cctv_view');

    const cctv_view_wrap = document.getElementsByClassName('cctv_view_wrap')[0];

    const cctv_select = document.getElementsByClassName('cctv_select');
    
  
    let player0 = new window.jsmpeg(client0, {
      canvas: cctv_view[0],
    });

    let player1 = new window.jsmpeg(client1, {
      canvas: cctv_view[1],
    });

    let player2 = new window.jsmpeg(client2, {
      canvas: cctv_view[2],
    });
  })


  return (

    <div className='mainLayout'>
      <Header></Header>

      <div className='mainLayout2'>
        {/* <SideBar></SideBar> */}

        <div className='main'>

          <div className='contents'>
            <div className='mapWrap'>
              <div id="map" />
            </div>

            <div className='shipInfo_wrap'>
              <div className='currentTime_wrap'>
                <Clock></Clock>
              </div>

              <hr />


              <div className='searchOption_wrap'>
                <div className='searchOption'>
                  <label htmlFor="">전체 배 조회</label>
                  <input role="switch" type="checkbox" className='toggle' />
                </div>

                <div className='searchOption'>
                  <label htmlFor="">기간</label>
                  <div>
                    <input type="date" name="" id="" className='inputDate' />&nbsp;~&nbsp;
                    <input type="date" name="" id="" className='inputDate' />
                  </div>
                </div>
              </div>

              <hr />

              <div style={{padding: "20px 30px 0 30px", fontWeight: "bold"}}>선박 리스트</div>
              <ECDIS_add_marker></ECDIS_add_marker>
              <ECDIS_add_line></ECDIS_add_line>

              {/* <ECDIS_shipList></ECDIS_shipList> */}
            </div>

            <button className='mapResetBtn' onClick={location_clear}>위치 초기화</button>
            <button className='zoomInBtn' onClick={zoom_in}>+</button>
            <button className='zoomOutBtn' onClick={zoom_out}>-</button>


            <div className='cctvWrap cctvWrap_ '>
              <button onClick={cctv_close}>나가기</button>

              <div className="cctv_view_wrap">
                <div id="cctv1">
                  <div className="blanck"></div>
                  <div className="cctv_div">
                    <p>CCTV 1</p>
                    <canvas className="cctv_view"></canvas>
                  </div>
                </div>

                <div id="cctv2">
                  <div className="blanck"></div>
                  <div className="cctv_div">
                    <p>CCTV 2</p>
                    <canvas className="cctv_view"></canvas>
                  </div>

                </div>
                <div id="cctv3">
                  <div className="cctv_div">
                    <p>CCTV 3</p>
                    <canvas className="cctv_view"></canvas>
                  </div>

                </div>


              </div>
            </div>


            {/* <div className='cctv_back cctv_back_'>
                  
                </div> */}
          </div>



        </div>
        
        <ECDIS_basic></ECDIS_basic>
        

        {/* {MapView} */}

        
        
      </div>







    </div>
  );
};

export default Main;