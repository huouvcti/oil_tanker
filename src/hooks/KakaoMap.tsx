import React, {useEffect, useState} from 'react';

import axios from 'axios';

// import '../styles/main.scss';
import { JsxElement } from 'typescript';

declare global {
    interface Window {
        kakao: any;
    }
}


const KakaoMap = () => {

    let map: any;

    let mapLevel = 12;
    let mapCenter = new window.kakao.maps.LatLng( 34.570431279806456, 127.88142433013395);


    const shipInfo_more_close = () => {
        let ship_more_close_radio: any =  document.getElementsByClassName('ship_more_close')[0];
        ship_more_close_radio.checked = true;
    }

    

    const kakaoMap_basic = (): any => {
        


        




        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: mapCenter, //지도의 중심좌표.
            level: mapLevel, //지도의 레벨(확대, 축소 정도 0~14)
        };

    
        map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        map.setZoomable(true);
        // map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW)

        // var mapTypeControl = new window.kakao.maps.MapTypeControl();
        // map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
        
        // var zoomControl = new window.kakao.maps.ZoomControl();
        // map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        
        /*
        //라인 그리기
        var linePath = [
            new window.kakao.maps.LatLng(34.570431279806456, 127.88142433013395),
            new window.kakao.maps.LatLng(35.570431279806456, 127.88142433013395),
            new window.kakao.maps.LatLng(36.570431279806456, 127.88142433013395) 
        ];

        var polyline = new window.kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: 'red', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
            map: map
        });
        

        

        */

        // 마커 그리기
        var position =  new window.kakao.maps.LatLng(33.450701, 126.570667);
        var marker = new window.kakao.maps.Marker({
            position: position
        });

        marker.setMap(map);


        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', function() {
            document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap";
            

        });
    }


    const KakaoMap_shipList = (): any => {
        const currnet_position_marker: any = []

        const [shipList, setShipList] = useState([]);

        useEffect(() => {
            axios({
                method:"GET",
                url:"/api/gpsAPI/gps_current"
                }).then(function(res){
                    // API로 부터 받은 데이터 출력(클라이언트 IP출력)
    
                    let api_data = res.data;
    
                    api_data.forEach((item: any, index: any, arr: any) => {
                        let position = new window.kakao.maps.LatLng(item['latitude'], item['longitude']);
                        currnet_position_marker[index] = new window.kakao.maps.Marker({
                            map: map,
                            position: position
                        });

                        window.kakao.maps.event.addListener(currnet_position_marker[index], 'click', function() {
                            // document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap";
                            
                            let ship_more_radio: any =  document.getElementsByClassName('ship_more_visible');
                            ship_more_radio[index].checked = true;
                        });
    
                        setShipList(api_data)
                
                    })
    
    
                    console.log(shipList)
    
    
    
                    
    
                    console.log(res.data);
                }).catch(error => {
                    console.log(error);
            });
        }, [])
        

        console.log(shipList)

        
        const currentLocation_move = (value: any): any => {
            let currentLocation = new window.kakao.maps.LatLng( value['latitude'], value['longitude']);
            let setLevel = 2;
            map.setLevel(setLevel);
            map.panTo(currentLocation);
        }   
        
        

        return (

            <div className='shipInfoList_wrap'> 
                <input type="radio" name='ship_more_visible' className='ship_more_close'/>
                
                


                {shipList.map((value, index) => (
                    <div className='shipInfoList'>
                        <input type="checkbox" className='ship_visible'/>
                        <div className='shipInfo_text'  onClick={() => currentLocation_move(value)}>
                            <p>{value['router_id']}</p>
                            <p>rsrp: {value['rsrp']}</p>
                        </div>
                        <input type="radio" name='ship_more_visible' className='ship_more_visible'/>

                        <div className='ship_more'>
                            <span className='ship_more_close_btn' onClick={shipInfo_more_close}>X</span>

                            <p>{value['router_id']}</p>
                            <img src="https://i.namu.wiki/i/7jeVH_6qCK1ARphL-QXYaKMHRtJFVGN6wioSM6osgORavCV42-iwKWp_4hmvfxy9VToDHRk13315si8KsWZPpg.webp" alt="" />
                            <ul>
                            <li>선박 정보</li>
                            <li>현재 위치: {value['latitude']}, {value['longitude']}</li>
                            <li>rsrp: {value['rsrp']}</li>
                            
                            <li>...</li>
                            </ul>
                        </div>
                    </div>
                ))}

                
                
                    
                        
                    

            </div>
        );
    }
    
    const KakaoMap_route = (): any => {

        
        axios({
            method:"GET",
            url:"/api/gpsAPI/gps_route"
            }).then(function(res){
                // API로 부터 받은 데이터 출력(클라이언트 IP출력)

                let api_data = res.data;

                console.log(api_data)

                api_data.forEach((item: any, index: any, arr: any) => {
                    let linePath = [];

                    for(let i=0; i<item['latitude'].length; i++){
                        linePath.push(new window.kakao.maps.LatLng(item['latitude'][i], item['longitude'][i]));

                        
                    }


                    console.log(linePath)
            
                    let polyline = new window.kakao.maps.Polyline({
                        path: linePath, // 선을 구성하는 좌표배열 입니다
                        strokeWeight: 10, // 선의 두께 입니다
                        strokeColor: '#' + Math.round(Math.random() * 0xffffff).toString(16), // 선의 색깔입니다
                        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'solid', // 선의 스타일입니다
                        map: map
                    });
                })
                console.log(res.data);
            }).catch(error => {
                console.log(error);
        });


        


        
    }


    const KakaoMap_center = () => {
        map.setLevel(mapLevel);
        map.panTo(mapCenter);  
    }

    return {
        kakaoMap_basic,
        KakaoMap_shipList,
        KakaoMap_route,

        KakaoMap_center
    };
}




export default KakaoMap;