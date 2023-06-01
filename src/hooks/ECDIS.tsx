// import React, { useEffect, useRef, useState } from 'react';

// import axios from 'axios';

// import 'ol/ol.css';
// import { Map, View } from 'ol';
// import { defaults } from 'ol/control';
// import { fromLonLat, get, transform } from 'ol/proj';
// import { Tile } from 'ol/layer';
// import { OSM, XYZ, TileImage } from 'ol/source';
// import MouseWheelZoom from 'ol/interaction/MouseWheelZoom.js';
// import TileLayer from 'ol/layer/Tile';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';
// import { Vector as VectorSource } from 'ol/source';
// import { Vector as VectorLayer } from 'ol/layer';
// import { Style, Icon } from 'ol/style';

// import '../styles/main.scss';
// import { JsxElement } from 'typescript';

// declare global {
// }


// const ECDIS = () => {


//     let map: any;

//     const ECDIS_basic = (): any => {
//         const mapRef = useRef<any>();



//         const currnet_position_marker: any = []

//         const [shipList, setShipList] = useState([]);


//         useEffect(() => {
//             map = new Map({ // ①
//                 controls: defaults({ zoom: true, rotate: false }).extend([]),
//                 layers: [ // ②
//                     new Tile({
//                         source: new TileImage({
//                             tileUrlFunction: function (tileCoord: any) {
//                                 return "https://navada.kr/katecMapTileImg/google/" + (tileCoord[0] - 6) + "/" + tileCoord[2] + "/" + tileCoord[1] + ".png";
//                             }
//                         })
//                     }),
//                 ],
//                 target: mapRef.current,
//                 view: new View({
//                     center: transform([126.08024, 34.2745], 'EPSG:4326', 'EPSG:900913'),
//                     zoom: 7.8,
//                     minZoom: 1,
//                     maxZoom: 9,
//                 })
//             });




//             // 마우스 휠 이벤트 핸들러 등록
//             const handleMouseWheel = (event: any) => {
//                 event.preventDefault(); // 기본 스크롤 동작 방지

//                 const delta = Math.sign(event.deltaY); // 휠 이벤트의 delta 값을 가져옴 (양수: 휠 위로, 음수: 휠 아래로)
//                 const view = map.getView();
//                 const currentZoom = view.getZoom();

//                 // 휠 이벤트 방향에 따라 줌 레벨 조정
//                 if (delta > 0) {
//                     view.setZoom(currentZoom - 1);
//                 } else {
//                     view.setZoom(currentZoom + 1);
//                 }
//             };

//             // 이벤트 핸들러 등록
//             if (mapRef.current) {
//                 mapRef.current.addEventListener('wheel', handleMouseWheel, { passive: false });
//             }
//         }, [])

//         return (
//             <div className="mapPo" id="map" ref={mapRef}></div>
//         );
//     }


//     const shipList = async (): Promise<any> => {

//         const displayMarkers = async (data: any) => {
//             let markerSource  = new VectorSource();

//             const iconStyle = new Style({
//                 image: new Icon({
//                     src: 'data:image/png;base64,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', // 커스텀 마커 이미지 경로
//                     anchor: [0.5, 1] // 마커 이미지의 앵커 포인트 설정
//                 })
//             });

//             const markerLayer = new VectorLayer({
//                 source: markerSource,
//                 style: iconStyle
//             });


//             // const a = await axios({
//             //     method: "GET",
//             //     url: "/api/gpsAPI/gps_current"
//             // });

//             // data.forEach((item: any) => {
//             //     let position = [item['longitude'], item['latitude']]
//             //     console.log('=============', position)
//             //     let marker = new Feature({
//             //         geometry: new Point(fromLonLat(position))
//             //     });

//             //     markerSource.addFeature(marker);

//             //     console.log(markerSource)
//             // });
//             for (const item of data) {
//                 let position = [item['longitude'], item['latitude']]
//                 console.log('=============', position)
//                 let marker = new Feature({
//                     geometry: new Point(fromLonLat(position))
//                 });

//                 markerSource.addFeature(marker);

//                 console.log(markerSource)
//             }



//             map.addLayer(markerLayer);
//         };


//         // console.log('==========================', a)

//         // 정적 데이터 예제
//         const staticData = [
//             // ...a.data,
//             { longitude: 123.45, latitude: 45.67 },
//             { longitude: 127.072914, latitude: 36.736919 }
//         ];

//         await displayMarkers(staticData)
//     }

//     return {
//         ECDIS_basic,
//         shipList
//     }

// }




// export default ECDIS;

import { transform } from 'ol/proj';
import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Icon } from 'ol/style';
import axios from 'axios';
import { defaults } from 'ol/control';
import { Tile } from 'ol/layer';
import { XYZ, TileImage } from 'ol/source';



const MapComponent = () => {
    const mapRef = useRef(null);
    const markerSourceRef = useRef(new VectorSource());
    const markerLayer = new VectorLayer({
        source: markerSourceRef.current
    })
    const [markers, setMarkers] = useState([]);
    
    useEffect(() => {
        const map = new Map({
            controls: defaults({ zoom: true, rotate: false }).extend([]),
            layers: [ // ②
                new Tile({
                    source: new TileImage({
                        tileUrlFunction: function (tileCoord: any) {
                            return "https://navada.kr/katecMapTileImg/google/" + (tileCoord[0] - 6) + "/" + tileCoord[2] + "/" + tileCoord[1] + ".png";
                        }
                    }),
                    
                }),
                markerLayer
            ],
            target: mapRef.current,
            view: new View({
                center: transform([126.08024, 34.2745], 'EPSG:4326', 'EPSG:900913'),
                zoom: 7.8,
                minZoom: 1,
                maxZoom: 9,
            })
        });

        // console.log(map)

        return () => {
            map.setTarget(null);
        };
    }, []);

    useEffect(() => {
        // Axios로 데이터 가져오는 함수
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "/api/gpsAPI/gps_current"
                );
                const data = response.data;
                // console.log(data)
                setMarkers(data); // 데이터 업데이트
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // 일정 시간마다 데이터를 업데이트
        const interval = setInterval(fetchData, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        // markers 배열이 업데이트될 때마다 마커를 추가 또는 업데이트
        markerSourceRef.current.clear();

        markers.forEach((markerData) => {
            const { latitude, longitude } = markerData;
            console.log(latitude, longitude)
            const marker = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude]))
            });

            const iconStyle = new Style({
                image: new Icon({
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAABvb29QUFCurq5LS0vc3NwYGBjh4eF9fX0gICDFxcWMjIzr6+sMDAzIyMjOzs75+fm0tLSUlJTz8/NdXV3V1dWamprm5uanp6e7u7tXV1cxMTFGRkZ0dHTv7+9lZWVAQECBgYGYmJgnJycLCws3NzcVFRXv7JzRAAAFsUlEQVR4nO2c7XqiMBCFiyhbRasoBUHrV9Xe/x3uQxfIAAliEgi45/2pIckhMDNJJry9AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdEmwTolN96QtLlaG6Z60xTwTODPdk7aAwuEDhcMHCocPR2G0SXmNIICj8Jz9NDXYL31wFE6gcFhA4fCBwuEDhcMHCofP/63wYrBf+nixMfze/ynzYeUSs5/yX26V0vuNaQm1eHdLnZlvWkYNBw0CLetkWoaYhRaBlrUwLUSIo0nhyrQQIboULk0LEQKFUDgkheH4ecJBKdxKXL0dlMJ3iavfobAHQGE9UNgHoLAeKOwDUFgPUziE+aGawnDp8jEuXZdCMTPDGttXaPoJ7kLhXnuvn6ELhVJVa6MThUYfUyisBwpfSeHto8prKYyOixLH1Wsp5ORkVoNWL7QnT2FvjiriftGlcF33Z6pwxbZZmxMoyXvrVOHcksJTE9idwvcvOYFWNBCFkaQ+yxoNQWHgfUoLVM796EThZiYvkGel+6dQBeWpV+8VOoNTuLtMH3A5keKqlpR2QyZfhOWqcN6WrcVh3KBWmxX/lOiUc7EpzEt92c/Drr7X/ZlzbrINuyEXSORahdVmu6NR/tuKXCCxzrw0ps6yZo1CTJ94lvnzAukj3jWHZgHmiF1xlhDoX40JbOi41+QSGevumVI4aWgyqP1tYnarKMSHKoRN+3dm18g4ireioeqMa+NZLJlC/sgm5crO0hQ4NO4ctfTSG5IBq8M+jDpg0zyw9IhAGUeRwvzFSb6SdiBGQsZRZJA3UXmRRy9jMoQySXY5u7waSWvVEnQqIucoMsggGt+BppBTEapLM3YvB5F9Ekf99EYv30TqqNUfrfwIkzXR0Dct+HocRQbxiX0ZRLJw8aWjPmZOdzqqU4euFys5ioy+mVN6YICzpCUDix56MYhkTqfqKDL6NYhT1psfbZXaPRpEV6ujyAj6M4jHG+vLt8Z6mTk17RNZTyxbZ729GUS6gKv3mGZPzCl1FJq/QNWPQfT2rBvNVzsa0otBJI5ir5qSUKEPg0gdRQshMjNiWoJdCeiMovGS6hOQl9zQIJJdlHZ81mfL9T+iPUeRYfhNJM3rdhQ5bN5pYBA9slHY2vdSyF3s/lQP2ShsMZmfvYlaQ8ImxOQZVc4oEWPOnNIvjrThKHLYIKrsFEjA1vusk+aqo/XKYfERGcT0TVw4y3E0joPaLeZtEI+jtevU2XjPWSWFVg5vfZdmlGwetfYkSZ2z3ToTWTSni/Arzz/fjwQPbjDNF+Bv542gb/Fnvvgys8dlkdRRZK25mgS+ZVXO/7VKB/F4KjV75Sx8uftSoR0noKxk7UwLGr2fisLkdqlneBUUZut2TBUvRfJcMnPbHafQtDRELi+fm3Z/xPk/Ya/F3JEKT8ni66OPmxTymASZvjMakviCL0/Z+fO85hdIuGiYQhUqTG5s+dEss8+fQmciLDTKTw3EH8JCqVeo/TTVVf11LNU4j2vuaMo5dB1nGYn1JZzGKyeIN/UHDi5x4ATn+tauoas2VXyopw8ozTRMd74RUFiPF4R1qfNf68Tm+avab/GN3KQP27gu1fFnHiSG0YnKDpRyj5zf1i7Fn5Xnw57wgM6N+fh3YQ4ccZKu8GYdmJMUZ+2ynItitKFhxh/wb+ypcFRszC1TnAp4U26Zj8J8U3AiaFLYDKXTKS1rGt/VFv+U1xJ8jq+clPdoeTer8hVXTqjwUQkJ2YuhZ9XmOC/6rjsvLAxKGnc8h7wuDtHtwInG/dK5mX3IiV6cTKOudSnfvZzT+7mbi7zsIhqlg3Q9haI9dmfzmd6u+zQWHIr0lpf0Ttzs+UoQnR3Hh7tGhb/teset/ygY9LzF1ntYyN8uHhX619rDQv39VCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAQPkLvG9Uh1m7+gYAAAAASUVORK5CYII=', // 커스텀 마커 이미지 경로
                    anchor: [0.5, 1] // 마커 이미지의 앵커 포인트 설정
                })
            });

            // const markerLayer = new VectorLayer({
            //     source: markerSourceRef.current,
            //     style: iconStyle
            // })
            // map.addLayer(markerLayer)
            marker.setStyle(iconStyle)
            markerSourceRef.current.addFeature(marker);
        });
    }, [markers]);

    return <div ref={mapRef} id="map"></div>;
};

export default MapComponent;