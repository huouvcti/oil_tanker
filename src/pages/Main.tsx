import React from 'react';

import Header from '../components/header/Header';

import SideBar from '../components/sideBar/SideBar';

import KakaoMap from '../hooks/KakaoMap';

import '../styles/main.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faFolder, faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Main = () => {


  const cctvExit = () => {
    document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap cctvWrap_";

    document.getElementsByClassName('cctv_back')[0].className = "cctv_back cctv_back_";
  }

  return (
    

    <div className='mainLayout'>
        <Header></Header>
        
        <div className='mainLayout2'>
            <SideBar></SideBar>

            <div className='main'>

              <div className='contents'>
                <div className='inform'>
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
                </div>
                <div className='mapWrap'>
                  <KakaoMap></KakaoMap>
                </div>



                <div className='cctvWrap cctvWrap_'>
                    <button onClick={cctvExit}>나가기</button>       
                </div>

                <div className='cctv_back cctv_back_'>
                  
                </div>
              </div>

              
              
            </div>
            
        </div>
        
        
    </div>
  );
};

export default Main;