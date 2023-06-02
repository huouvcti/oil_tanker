import { transform } from 'ol/proj';
import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import {Point, MultiPoint} from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Icon, Stroke } from 'ol/style';
import axios from 'axios';
import { defaults } from 'ol/control';
import { Tile } from 'ol/layer';
import { XYZ, TileImage } from 'ol/source';
import LineString from 'ol/geom/LineString';

import ship_icon  from '../assets/images/map_ship_icon.png'
import ship_icon2  from '../assets/images/map_ship_icon2.png'



const ECDIS = () => {

    const [center, setCenter] = useState([126.08024, 35.2745]);
    const [zoom, setZoom] = useState(7.8);



    


    

    const ECDIS_basic = () => {
        const mapRef = useRef(null);


        const markerSourceRef = useRef(new VectorSource());
        const markerLayer = new VectorLayer({
            source: markerSourceRef.current
        })
        const [markers, setMarkers] = useState([]);


        const lineSourceRef = useRef(new VectorSource());
        const lineLayer = new VectorLayer({
            source: lineSourceRef.current
        });

        let [lines, setLines] = useState([]);

        
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
                    markerLayer,
                    lineLayer
                ],
                target: mapRef.current,
                view: new View({
                    center: transform(center, 'EPSG:4326', 'EPSG:900913'),
                    zoom: zoom,
                    minZoom: 1,
                    maxZoom: 20,
                })
            });
    
            // console.log(map)
    
            return () => {
                map.setTarget(null);
            };
        }, [center, zoom]);


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

        const fetchData2 = async () => {
            try {
                const response = await axios.get(
                    "/api/gpsAPI/gps_route"
                );
                const data = response.data;

                
                lines = [];
                data.forEach( async (item: any, index: any, arr: any) => {
                    let linePath = [];

                    for(let i=0; i<item['latitude'].length; i++){

                        
                        linePath.push(fromLonLat([item['longitude'][i], item['latitude'][i]]));  
                    }

                    lines.push(linePath)
                    console.log(lines)

        
                    // setLines([lines][linePath]);
                })

                setLines(lines)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        useEffect(() => {
            // 일정 시간마다 데이터를 업데이트
            const interval = setInterval(fetchData, 500);
            const interval2 = setInterval(fetchData2, 500);


            lines.push()
    
            return () => {
                clearInterval(interval);
                clearInterval(interval2);
            };
        }, []);

        useEffect(() => {
            // line 배열이 업데이트될 때마다 마커를 추가 또는 업데이트


            // const line = new Feature({
            //     geometry: new LineString(lines)
            //   });

            //   const lineStyle = new Style({
            //     stroke: new Stroke({
            //       color: '#' + Math.round(Math.random() * 0xffffff).toString(16),
            //       width: 2,
            //     }),
            //   });
        
            //  line.setStyle(lineStyle);
            console.log("++++++++++++++++++")

            
            console.log(lines)


            const newLines = lines.map((lineData) => {

              const line = new Feature({
                geometry: new LineString(lineData)
              });

              const lineStyle = new Style({
                stroke: new Stroke({
                  color: '#f00',
                  width: 3,
                  
                }),
              });
        
              line.setStyle(lineStyle);
        
              return line;
            });
        
            lineSourceRef.current.clear();
            lineSourceRef.current.addFeatures(newLines);
          }, [lines]);





          useEffect(() => {
            // markers 배열이 업데이트될 때마다 마커를 추가 또는 업데이트
            const newMarkers = markers.map((markerData) => {
              const { latitude, longitude } = markerData;
              console.log(latitude, longitude)
              const marker = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude]))
              });
        
              // 커스텀 마커 스타일 설정
              const iconStyle = new Style({
                image: new Icon({
                    src: ship_icon2, // 커스텀 마커 이미지 경로
                    anchor: [0.5, 0.5], // 마커 이미지의 앵커 포인트 설정
                    scale: 0.08
                })
            });
              marker.setStyle(iconStyle);
        
              return marker;
            });
        
            markerSourceRef.current.clear();
            markerSourceRef.current.addFeatures(newMarkers);
          }, [markers]);
    
        return <div ref={mapRef} id="map"></div>;
    };

    const ECDIS_shipList = () => {

        const [shipList, setShipList] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        "/api/gpsAPI/gps_current"
                    );
                    const data = response.data;

                    setShipList(data)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            // 일정 시간마다 데이터를 업데이트
            const interval = setInterval(fetchData, 500);
        
            return () => {
                clearInterval(interval);
            };
        }, [])


        const shipInfo_more_close = () => {
            let ship_more_close_radio: any =  document.getElementsByClassName('ship_more_close')[0];
            ship_more_close_radio.checked = true;
        }
    
        const currentLocation_move = (value: any): any => {
            const newCenter = [value['longitude'], value['latitude']];
            setCenter(newCenter);
            setZoom(10);
        }


        return (
            <div className='shipInfoList_wrap'> 
                <input type="radio" name='ship_more_visible' className='ship_more_close'/>
                
                {shipList.map((value, index) => (
                    <div className='shipInfoList'>
                        <input type="checkbox" className='ship_visible'/>
                        <div className='shipInfo_text' onClick={() => currentLocation_move(value)}>
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
        )
    }


    const ECDIS_shipRoute = () => {


        // useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             const response = await axios.get(
        //                 "/api/gpsAPI/gps_route"
        //             );
        //             const data = response.data;


        //             data.forEach((item: any, index: any, arr: any) => {
        //                 let linePath = [];
    
        //                 for(let i=0; i<item['latitude'].length; i++){
        //                     linePath.push(new window.kakao.maps.LatLng(item['latitude'][i], item['longitude'][i]));  
        //                 }
        //                 console.log(linePath)
        //             })

        //         } catch (error) {
        //             console.error('Error fetching data:', error);
        //         }
        //     };

        //     // 일정 시간마다 데이터를 업데이트
        //     const interval = setInterval(fetchData, 500);
        
        //     return () => {
        //         clearInterval(interval);
        //     };
        // }, [])


    }




    return {
        ECDIS_basic,
        ECDIS_shipList,
        ECDIS_shipRoute
    }

}




export default ECDIS;