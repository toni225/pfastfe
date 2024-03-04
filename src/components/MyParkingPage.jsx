import Layout from "./layout/Layout";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as userServices from "../services/user.service";
import * as authServices from "../services/auth.service";
import VehiclesSVG from "./layout/VehiclesSVG";
import { PlusCircleIcon} from '@heroicons/react/24/solid';

const MyParkingPage = () => {
    // const CDNURL = "https://evrqsaavaohqlopnfgtq.supabase.co/storage/v1/object/public/images/"

    const navigate = useNavigate()
    const [parkingList,setParkingList] = useState([])
    // const [image,setImage] = useState([])

    const fetchUser = async (username) => {
        try{
            const user = JSON.parse(localStorage.getItem('user'))
            const {data} = await userServices.getMyParking(user.username)
            // console.log(response)
            setParkingList(data.users)
        }catch (e) {
            console.log(e)
        }
    }

    // const getParkingImage = async (username,parkingName) => {
    //     userService.getImageParking(username,parkingName)
    //         .then(res=>{
    //             setImage(res.data.response.data[0]?.name)
    //         })
    // }

    useEffect(()=>{
        fetchUser().catch(e=>console.log(e))
    },[])

    return (
        <Layout>
            <div id="entire-container">
                <ul className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 p-10">
                    {parkingList.map(myparking=>{
                        return (
                            <li key={myparking.ParkingID} className="bg-PO-Secondary text-PO-Primary w-[300px] h-[150px] text-left mx-auto rounded-md relative transition-transform duration-300 transform hover:scale-110">
                                {/*<img className="w-[300px] h-[150px] object-cover rounded-md" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"/>*/}
                                <div className="px-3 py-2">
                                    <div className="py-2 overflow-ellipsis truncate text-2xl">{myparking.ParkingName}</div>
                                    <div className="py-2 overflow-ellipsis truncate text-xs">{myparking.Lat}{myparking.Lng}</div>
                                    {/*<VehiclesSVG />*/}
                                </div>
                                <div
                                    onClick={()=>{navigate(`/myparking/${myparking.ParkingID}`)}}
                                    className="bg-PO-Tertiary text-PO-Secondary p-3 text-center tracking-widest rounded-b-md absolute bottom-0 w-full hover:cursor-pointer transition-transform duration-300 transform hover:scale-110">
                                    OPEN PARKING
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="fixed w-[64px] h-[64px] right-0 bottom-0 mr-3 mb-3 z-9999">
                <div className="sticky hover:bg-PO-Secondary hover:rounded-full hover:cursor-pointer transition-transform duration-300 transform hover:scale-110 text-PO-Tertiary ">
                    <PlusCircleIcon title={'Create Parking'} onClick={()=>navigate('/create')}/>
                </div>
            </div>
            
        {/* <div className={'place-items-center'}>
            <button
                type={"button"}
                onClick={()=>navigate('/create')}
                className="md:ml-10 mt-5 focus:outline-none text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >Add Parking</button>
        </div> */}
        </Layout>
    )
}

export default MyParkingPage
