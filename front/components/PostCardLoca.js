import React, { useState, useEffect } from 'react';
import { EnvironmentFilled } from '@ant-design/icons';

import { Map, MapMarker } from "react-kakao-maps-sdk";
//함수를 객체의 초기값으로 넣어주어서 주소의 값을 변경해주는 방법 시도 
//주소를 변경해주는 방법에 대한 고민 클릭으로 넣어주는 방법은 안되고 바로 나와야 하는데 초기값으로 주소를 넣어주는 방법

const PostCardLoca = ({ postAddress }) => {
  const [openMap, setOpenMap] = useState(false);
  const [map, setMap] = useState()

  useEffect(() => {
    if (!map) return
    //const ps = new kakao.maps.services.Places();
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${postAddress}`, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x))

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map])
  
  return (
    <div>
      {openMap ?
        <Map
        center={{ lat: 37.566826, lng: 126.9786567, }}
        style={{ width: "450px", height: "300px", }}
        level={3}
        onCreate={setMap}
        >
          <button style={{ float: 'right', color: 'yellowgreen' }} onClick={() => setOpenMap(false)}>닫기</button>
        </Map>
        : <p onClick={() => setOpenMap(true)}><EnvironmentFilled />{postAddress}</p>
      }
    </div>
  )

}

export default PostCardLoca;