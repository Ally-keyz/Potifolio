import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
import { useState,useEffect } from "react";



function ProtectedRoute({children}){
    const[isAuthorized,setIsAuthorized] = useState(null)

    useEffect(()=>{
        accessToken().catch(()=>setIsAuthorized(false))
    },[])

    const refreshToken = async()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = api.post("/myapp/api/token/refresh/",{
                refresh:refreshToken
            })
            if(res.status == 200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }
        catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const accessToken = async()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now){
            await refreshToken()
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