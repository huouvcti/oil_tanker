import React, { useState, useEffect, useRef, RefObject } from 'react';

import Header from '../components/header/Header';

import SideBar from '../components/sideBar/SideBar';

import KakaoMap from '../hooks/KakaoMap';

import '../styles/main.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faFolder, faPowerOff } from "@fortawesome/free-solid-svg-icons";

import {useInterval} from 'react-use';

import { loadPlayer } from 'rtsp-relay/browser'



const Clock = () => {

  const [date, setDate] = useState(()=> new Date())
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
  const { kakaoMap_basic, KakaoMap_shipList, KakaoMap_route, KakaoMap_center } = KakaoMap();


    const [shipInfoList, setShipInfoList] = useState("");
  




  useEffect(() =>  {
    kakaoMap_basic();


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


    // (async function() {
    //     setShipInfoList(await kakaoMap_route(shipInfo_more_close));

    //     console.log(shipInfoList)
    // })(); 


   

    let shipInfoList_wrap: any =  document.getElementsByClassName('shipInfoList_wrap')[0];

    
  },[])

 
  

  const cctvExit = () => {
    document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap cctvWrap_";
    
  }


  const shipInfo_more_close = () => {
    let ship_more_close_radio: any =  document.getElementsByClassName('ship_more_close')[0];
    ship_more_close_radio.checked = true;
  }




  

  return (
    

    <div className='mainLayout'>
        <Header></Header>
        
        <div className='mainLayout2'>
            {/* <SideBar></SideBar> */}

            <div className='main'>

              <div className='contents'>
                {/* <div className='inform'>
                  <h1>유조선 정보</h1>

                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faHouse}/>
                      <div>
                        <p className='title'>title</p>
                        <p className='content'>content</p>
                      </div>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faHouse}/>
                      <div>
                        <p className='title'>title</p>
                        <p className='content'>content</p>
                      </div>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faHouse}/>
                      <div>
                        <p className='title'>title</p>
                        <p className='content'>content</p>
                      </div>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faHouse}/>
                      <div>
                        <p className='title'>title</p>
                        <p className='content'>content</p>
                      </div>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faHouse}/>
                      <div>
                        <p className='title'>title</p>
                        <p className='content'>content</p>
                      </div>
                    </li>

                  </ul>
                </div> */}
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
                        <input type="date" name="" id="" className='inputDate'/>&nbsp;~&nbsp; 
                        <input type="date" name="" id="" className='inputDate'/>
                      </div>
                    </div>
                  </div>

                  <hr />

                  


                  {/* <div className='shipInfoList_wrap' dangerouslySetInnerHTML={{__html: shipInfoList}}> */}

                  {/* <div className='shipInfoList_wrap'> */}

                    {/* <input type="radio" name='ship_more_visible' className='ship_more_close'/>

                    <div className='shipInfoList'>
                        <input type="checkbox" className='ship_visible'/>
                        <div className='shipInfo_text'>
                            <p>제주은갈치</p>
                            <p>배 정보</p>
                        </div>
                        <input type="radio" name='ship_more_visible' className='ship_more_visible'/>

                        <div className='ship_more'>
                            <span className='ship_more_close_btn' onClick={shipInfo_more_close}>X</span>

                            <p>제주은갈치11111</p>
                            <img src="https://i.namu.wiki/i/7jeVH_6qCK1ARphL-QXYaKMHRtJFVGN6wioSM6osgORavCV42-iwKWp_4hmvfxy9VToDHRk13315si8KsWZPpg.webp" alt="" />
                            <ul>
                            <li>선박 ID</li>
                            <li>선박 정보</li>
                            <li>...</li>
                            <li>...</li>
                            </ul>
                        </div>
                    </div>

                    <hr />

                    <div className='shipInfoList'>
                        <input type="checkbox" className='ship_visible'/>
                        <div className='shipInfo_text'>
                            <p>제주은갈치</p>
                            <p>배 정보</p>
                        </div>
                        <input type="radio" name='ship_more_visible' className='ship_more_visible'/>

                        <div className='ship_more'>
                            <span className='ship_more_close_btn' onClick={shipInfo_more_close}>X</span>

                            <p>제주은갈치</p>
                            <img src="https://i.namu.wiki/i/7jeVH_6qCK1ARphL-QXYaKMHRtJFVGN6wioSM6osgORavCV42-iwKWp_4hmvfxy9VToDHRk13315si8KsWZPpg.webp" alt="" />
                            <ul>
                            <li>선박 ID</li>
                            <li>선박 정보</li>
                            <li>...</li>
                            <li>...</li>
                            </ul>
                        </div>
                    </div> */}


                        


                    {/* </div> */}

                    <KakaoMap_shipList></KakaoMap_shipList>

                </div>

                <button className='mapResetBtn' onClick={KakaoMap_center}>위치 초기화</button> 


                <div className='cctvWrap cctvWrap_ '>
                  <button onClick={cctvExit}>나가기</button>

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
            
        </div>


        
        
        
    </div>
  );
};

export default Main;