import { useContext, useState } from 'react'
import { AuthContext } from '../../content/AuthContext';
 

export const useMessage = () => {

    const textDecoder1 = new TextDecoder("UTF-8");
    const { logout } = useContext( AuthContext );

    const [msg, setMsg] = useState({'type':'', 'txt':''});

    const clean = ()=>{
        setMsg({'type':'', 'txt':''})
    }

    const responseError = async (resp)=>{  
        if(!resp.ok){
            if(resp.status == 401){
                logout();
            }else{ 
                const bufferInfo = await resp.arrayBuffer();   
                setMsg({'type':'error', 'txt':textDecoder1.decode(bufferInfo, {stream:true})})
            } 
        }  
    }

    const error = (msg)=>{  
        setMsg({'type':'error', 'txt':msg})
    }

    const warning = (msg)=>{
        setMsg({'type':'warning', 'txt':msg})
    }

    const success = (msg)=>{
        setMsg({'type':'ok', 'txt':msg})
    }

    return (
    {clean, warning, success, error, msg, responseError}
    )
}
