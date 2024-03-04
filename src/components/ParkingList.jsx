import * as userServices from "../services/user.service"

import {useEffect, useState} from "react";
import Layout from "./layout/Layout";
import {useNavigate} from "react-router-dom";
import { CheckCircleIcon, ExclamationCircleIcon, MapIcon } from '@heroicons/react/24/solid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ParkingList = () => {
    const navigate = useNavigate()
    const [parkingList,setParkingList] = useState([])
    const [latLng, setLatLng] = useState({})
    const [radius, setRadius] = useState(500); // Define age state variable here

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setRadius(event.target.value);
      };

    const fetchUser = async () => {
        try{
            const {data} = await userServices.getAllParking()
            setParkingList(data.users)

        }catch (e) {
            
        }
    }

    //check if the parking lot is in the VO's radius. returns boolean
    function checkCircleInMarker(markerPosition, circlePosition, radius) {
        var R = 6371e3; // Earth's radius in meters
        var φ1 = (markerPosition.lat * Math.PI) / 180;
        var φ2 = (circlePosition.lat * Math.PI) / 180;
        var Δφ = ((circlePosition.lat - markerPosition.lat) * Math.PI) / 180;
        var Δλ = ((circlePosition.lng - markerPosition.lng) * Math.PI) / 180;

        var a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var distance = R * c; // Distance in meters

        return distance <= radius;
    }

    //getting VO's current location. returns false if not and setting location if VO turns on location.
    const getUserLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos=>{
                setLatLng({lat:pos.coords.latitude,lng:pos.coords.longitude})
            },err => {
                return false
            })
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <Layout>
            <div>
                {/* <div className="mt-10 flex justify-center">
                    <div className="flex items-center">
                        <img src={gps} class="object-contain h-20 w-20" alt=""></img>
                    </div> */}

                <div className="mt-10 flex justify-center -mb-10">
                    <div className="flex items-center">
                        <button onClick={()=>navigate('/parking')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#262341" className="object-contain h-20 w-20 mx-auto transition-transform duration-300 transform hover:scale-110">
                          <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                            {/* <img src={gps} className="object-contain h-20 w-20 mx-auto transition-transform duration-300 transform hover:scale-110" alt=""></img> */}
                            <h1 className="text-slate-800 text-2xl text-center font-sans font-bold mb-8">Explore Parkings</h1>
                        </button>
                    </div>
                </div>

                <hr className="m-5 border-slate-500"/>
                <h1 className="text-black-500 text-4xl text-center font-sans font-bold mb-8">Parking Lots Near You</h1>

                    <div className="flex justify-end mr-10"> {/*Radius Menu*/}
                    <FormControl sx={{ m: 1, minWidth: 80 }}> 
                    <InputLabel id="demo-simple-select-autowidth-label">Radius</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={radius}
                    onChange={handleChange}
                    autoWidth
                    label="Radius"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={500}>500 meters</MenuItem>
                    <MenuItem value={1000}>1000 meters</MenuItem>
                    <MenuItem value={1500}>1500 meters</MenuItem>
                    </Select>
                </FormControl>
                    </div>

                <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 pr-10 pl-10">
                    {getUserLocation() != false && parkingList.map((parking)=>{
                        return checkCircleInMarker({lat:parking.Lat,lng:parking.Lng},latLng,radius)
                            ?
                             (
                                 
                                    <li key={parking.ParkingID} className="bg-VO-Secondary border-solid border rounded-md shadow-my-shadow">
                                        <div className=" overflow-ellipsis truncate" >
                                            <div className="flex">
                                                <div className="m-2 w-[150px]">
                                                    <img  className="rounded-md shadow-my-shadow min-w-[150px] h-[100px]" src="https://static.stacker.com/s3fs-public/2019-03/Screen%20Shot%202019-03-14%20at%2010.49.01%20AM.png"></img>
                                                </div>
                                                <div className="rounded-md m-2 px-2 box-border border-1 max-h-[100px] flex flex-col overflow-hidden text-ellipsis ">
                                                    <p className="mb-1 text-2xl overflow-hidden text-ellipsis">{parking.ParkingName}</p>
                                                    <p className="text-md my-2">
                                                        {parking.ParkingStatus ?
                                                            <>
                                                                <CheckCircleIcon className="h-5 w-5 stroke-[0.5] stroke-black text-green-500 inline-block mr-1" />
                                                                Available
                                                            </>
                                                            :
                                                            <>
                                                                <ExclamationCircleIcon className="h-5 w-5 stroke-[0.5] stroke-black text-red-500 inline-block mr-1" />
                                                                Unavailable
                                                            </>
                                                        }
                                                    </p>
                                                    <p className="text-md overflow-hidden text-ellipsis">Block 6, Seawage, Pusok, Lapu-Lapu City, Cebu 6015, Philippines</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="bg-VO-Tertiary m-2 min-w-[150px] rounded-lg text-center shadow-my-shadow cursor-pointer" onClick={() => {
                                                            navigate('/parking', {
                                                                state: {
                                                                    lat: parking.Lat,
                                                                    lng: parking.Lng,
                                                                    parkingId: parking.ParkingID,
                                                                    username: parking.username,
                                                                    parkingName: parking.ParkingName
                                                                }
                                                            });
                                                            window.location.reload(); // Refresh the page
                                                        }}>
                                                        <button type={"button"} className="my-2" ><svg className="mx-auto" width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M29.0012 7.65305L29.4717 6.52913L28.3473 6.99861L8.08734 15.4586L6.94127 15.9372L8.09924 16.3862L14.9582 19.0458L14.9592 19.0462L16.3928 19.6056L16.9535 21.0599L16.9535 21.06L19.5935 27.9L20.0412 29.0599L20.5212 27.9131L29.0012 7.65305ZM14.1465 22.14L14.0668 21.9337L13.8606 21.8538L0.5 16.6775V15.3928L35.0675 0.932101L20.5873 35.5H19.303L14.1465 22.14Z" fill="#F9D94A" stroke="#F9D94A"/>
                                                            </svg>
                                                        </button>
                                                        <div className="inline-absolute text-VO-Secondary">NAVIGATE</div>
                                                </div>
                                                <div className="m-2 w-[100%] flex rounded-md">
                                                    <div className="w-[50%] flex flex-col justify-between items-center">
                                                    <svg class="" xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 0 24 24" width="64px" fill="#262341">
                                                        <defs>
                                                            <filter id="shadow">
                                                            <feDropShadow dx="-1" dy="2" stdDeviation="0.1" flood-color="#262341" flood-opacity="0.5" />
                                                            </filter>
                                                        </defs>
                                                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" filter="url(#shadow)" />
                                                        <circle cx="7.5" cy="14.5" r="1.5" />
                                                        <circle cx="16.5" cy="14.5" r="1.5" />
                                                    </svg>
                                                        <div>P 50/hr</div>
                                                    </div>
                                                    <div className="w-[50%] flex flex-col justify-between items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="64px" viewBox="0 0 20 20" width="64px" fill="#262341"><path strokeWidth="0.3" d="M14.5,9c-0.16,0-0.31,0.02-0.45,0.05L13,8h1.5V6.5l-2,1L11,6H9.01v1h1.58l1,1H9.5L7,9L6,8H3v1h2.5C4.12,9,3,10.12,3,11.5 C3,12.88,4.12,14,5.5,14c1.23,0,2.24-0.88,2.45-2.05L9,13h1.5l2.03-4.06l0.52,0.52C12.42,9.92,12,10.66,12,11.5 c0,1.38,1.12,2.5,2.5,2.5s2.5-1.12,2.5-2.5C17,10.12,15.88,9,14.5,9z M5.5,13C4.67,13,4,12.33,4,11.5S4.67,10,5.5,10 S7,10.67,7,11.5S6.33,13,5.5,13z M14.5,13c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S15.33,13,14.5,13z" filter="url(#shadow2)"/>
                                                        <defs>
                                                            <filter id="shadow2">
                                                            <feDropShadow dx="-1" dy="1" stdDeviation="0.1" flood-color="#262341" flood-opacity="0.5" />
                                                            </filter>
                                                        </defs></svg>
                                                        <div>P 20/hr</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                 
                            )
                            : ''
                    })}
                </ul>
            </div>
        </Layout>

    )
}

export default ParkingList
