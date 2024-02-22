import {APIProvider, AdvancedMarker, InfoWindow, Map,Pin, Marker, useAdvancedMarkerRef, useMarkerRef} from "@vis.gl/react-google-maps";
import {useEffect, useState} from "react";
import Directions from "./Directions";
import {toast} from "react-toastify";
import * as userService from '../../services/user.service'

const MapDisplay = ({data = [],page,markedLocation}) => {
    const position = {lat: 10.324444518537874, lng:123.95277453359705}

    const CDNURL = "https://evrqsaavaohqlopnfgtq.supabase.co/storage/v1/object/public/images/"
    const [image,setImage] = useState([])

    const [marker,setMarker] = useState({})
    const [openInfoWindow, setOpenInfoWindow] = useState(false)
    const [markerRef, useMarker] = useAdvancedMarkerRef()
    const [selectedMarker, setSelectedMarker] = useState(null)

    const [directions,setDirections] = useState({})
    const [doDirections,setDoDirections] = useState(false)
    const [origin,setOrigin] = useState('')

    const getParkingImage = async (username) => {
        userService.getImageParking(username)
            .then(res=>{
                setImage(res.data.response.data[0]?.name)
            })
    }

    // useEffect(()=>{
    //
    // },[AdvancedMarker])

    useEffect(()=>{
        if(page==="CreateParking"){
            markedLocation({lat:marker.lat,lng:marker.lng})

        }
    },[marker])

    useEffect(()=>{
       if(navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(pos=>{
               const lat = pos.coords.latitude
               const lng = pos.coords.longitude

               setOrigin(`${lat}, ${lng}`)
           },err=>{
               setOrigin('10.32546837125536, 123.95334301842492')
               console.log(err)
               toast.warning('Location is turned off.')
           })
       }else {
           setOrigin('10.32546837125536, 123.95334301842492')
       }
    },[])
    
    if(page==="ParkingPage"){
        return (
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div style={{height: "90vh"}}>
                    <Map
                        mapId={"bf51a910020fa25a"}
                        zoom={15}
                        center={position}
                    >
                        {data?.map(parking => {
                            return (
                                <div key={parking.ParkingID}>
                                    <AdvancedMarker 
                                        ref={markerRef}
                                        onClick={(e)=> {
                                            setOpenInfoWindow(true);
                                            setSelectedMarker(parking.ParkingID)
                                            getParkingImage(parking.username)
                                        }}
                                        position={{lat:parseFloat(parking.Lat),lng:parseFloat(parking.Lng)}}>
                                    <Pin
                                        background={'#22ccff'}
                                        borderColor={'#1e89a1'}
                                        glyphColor={'#0f677a'}>
                                    </Pin>
                                    {
                                        openInfoWindow && selectedMarker === parking.ParkingID && (
                                            <div key={parking.ParkingID}>
                                                <InfoWindow
                                                    maxWidth={400}
                                                    position={{lat:parseFloat(parking.Lat),lng:parseFloat(parking.Lng)}}
                                                    onCloseClick={() => {
                                                        setOpenInfoWindow(false)
                                                        setDoDirections(false)
                                                        setDirections('')
                                                    }}>
                                                    <div id="container" className="m-[10px] relative">
                                                        <img className="w-[262px] h-[131px] rounded-xl border border-black" rel={"image"} src={`${CDNURL}${parking.username}/${image}`}></img>
                                                        <div className="flex flex-col justify-between items-center max-w-[250px]">
                                                            <div className="bg-white mt-[-20px] py-[5px] shadow-my-shadow px-[10px] rounded-full text-lg">{parking.ParkingName}</div>
                                                        </div>
                                                        <div className="grid justify-items-center mt-3">
                                                            <div className="inline-flex items-center gap-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#18E318" height="16" viewBox="0 -960 960 960" width="16"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                                                                <div>Available</div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-3 justify-items-stretch text-center my-3">
                                                            <div className="flex flex-col justify-between items-center">
                                                                <svg className="" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FF8906"><path d="M0 0h24v24H0V0z" fill="none"/><path strokeWidth="0.3" stroke="black" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>
                                                                <div>P 50/hr</div>
                                                            </div>
                                                                <div className="flex flex-col justify-between items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="36px" viewBox="0 0 20 20" width="36px" fill="#FF8906"><path strokeWidth="0.3" stroke="black" d="M14.5,9c-0.16,0-0.31,0.02-0.45,0.05L13,8h1.5V6.5l-2,1L11,6H9.01v1h1.58l1,1H9.5L7,9L6,8H3v1h2.5C4.12,9,3,10.12,3,11.5 C3,12.88,4.12,14,5.5,14c1.23,0,2.24-0.88,2.45-2.05L9,13h1.5l2.03-4.06l0.52,0.52C12.42,9.92,12,10.66,12,11.5 c0,1.38,1.12,2.5,2.5,2.5s2.5-1.12,2.5-2.5C17,10.12,15.88,9,14.5,9z M5.5,13C4.67,13,4,12.33,4,11.5S4.67,10,5.5,10 S7,10.67,7,11.5S6.33,13,5.5,13z M14.5,13c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S15.33,13,14.5,13z"/></svg>
                                                                <div>
                                                                P 20/hr
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col justify-between items-center">
                                                                <img className="border-[#FF8906] border-2 w-12 h-12 rounded-full shadow-my-shadow" src="https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/405277689_1546985252724979_2436030445669801256_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEv92UyAB5lMmn4iWq4bzEQgFR9JhqaUoWAVH0mGppShS4rbAtE4eT4u2Pc1MRlps5GTY-dtgR9r17I-aTc1z-N&_nc_ohc=rhqlHF6dSvcAX8ApDQl&_nc_ht=scontent.fmnl4-3.fna&oh=00_AfCExSzJ-wMqB8Aw7pOKasd_yahgMEyjutu_cc6IB6ewzQ&oe=65DA41B1"></img>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col justify-between items-center mt-2">
                                                            <button className="bg-[#FF8906] rounded-xl w-[100px] h-[30px] text-[9px] shadow-my-shadow" onClick={()=>{
                                                                    setDirections({
                                                                        origin,
                                                                        destination: `${parking.Lat}, ${parking.Lng}`
                                                                    })
                                                                    setDoDirections(true)
                                                                }}>SHOW DIRECTION</button>
                                                        </div>
                                                    </div>
                                                </InfoWindow>
                                            </div>
                                        )
                                    }
                                    </AdvancedMarker>
                                </div>
                            )
                        })}
                        {doDirections && <Directions directions={directions}/>}
                    </Map>
                </div>

            </APIProvider>
        )
    }
    if(page==="CreateParking"){
        return (
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div style={{height: "60vh"}}>
                    <Map
                        zoom={15}
                        center={position}
                        onClick={e=> {
                            setMarker({lat: e.detail.latLng.lat, lng: e.detail.latLng.lng});


                        }}
                    >
                        {marker && (<Marker position={{lat:parseFloat(marker?.lat),lng:parseFloat(marker?.lng)}}/>)}
                    </Map>
                </div>

            </APIProvider>
        )
    }


}

export default MapDisplay
