import React, { useState, useEffect, useRef, RefObject } from 'react';

import Header from '../components/header/Header';

import SideBar from '../components/sideBar/SideBar';

import ECDIS from '../hooks/ECDIS';

import '../styles/main_E.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faFolder, faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { useInterval } from 'react-use';

import { loadPlayer } from 'rtsp-relay/browser'




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

  const { ECDIS_basic, ECDIS_shipList, ECDIS_shipRoute } = ECDIS();

  ECDIS_shipRoute();

  useEffect(() => {
  }, [])













  // const cctvExit = () => {
  //   document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap cctvWrap_";

  // }



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


              <ECDIS_shipList></ECDIS_shipList>
            </div>

            <button className='mapResetBtn'>위치 초기화</button>


            <div className='cctvWrap cctvWrap_ '>
              <button>나가기</button>

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
      </div>







    </div>
  );
};

export default Main;