import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { useState,useEffect } from "react";


function ProtectedRoute({children}){
    const[isAuthorized,setIsAuthorized] = useState(null)

    useEffect(()=>{
        accessToken().catch(()=>setIsAuthorized(false))
    },[])
    const accessToken = async()=>{
        const token = localStorage.getItem("ACCESS_TOKEN");
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now){
            setIsAuthorized(false);
        }else{
            setIsAuthorized(true)
        }
    }

    if(isAuthorized === null){
        return <div className="">Loading...</div>
    }
    return isAuthorized ? children : <Navigate to={'/'}/>
}


export default ProtectedRoute