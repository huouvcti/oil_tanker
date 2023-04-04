import React, {useEffect} from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}


const KakaoMap = () => {

    useEffect(() => {

        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng( 34.570431279806456, 127.88142433013395), //지도의 중심좌표.
          level: 12 //지도의 레벨(확대, 축소 정도 0~14)
        };
    
        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

            map.setZoomable(false);    


        var mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
        
        var zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        
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
            strokeStyle: 'solid' // 선의 스타일입니다
        });
        
        // 지도에 선을 표시합니다 
        polyline.setMap(map);  
        



        var position =  new window.kakao.maps.LatLng(33.450701, 126.570667);
        var marker = new window.kakao.maps.Marker({
            position: position
          });

        marker.setMap(map);


        

        window.kakao.maps.event.addListener(marker, 'click', function() {
            document.getElementsByClassName('cctvWrap')[0].className = "cctvWrap";
            document.getElementsByClassName('cctv_back')[0].className = "cctv_back";
        });

      }, [])

    return (
        <div id="map" />
    );
}

export default KakaoMap;