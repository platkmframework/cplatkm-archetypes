import { useContext, useState } from "react";
import { AuthContext } from "../../content/AuthContext";
import { useNavigate } from "react-router-dom";
import {config} from "../../config.js";
import { AES } from "crypto-js";
 

export const useFetch = (defaultDomain=config.baseURL) => { 
      
    const navigate = useNavigate();  
    const {user} = useContext( AuthContext);
    const textDecoder1 = new TextDecoder("UTF-8");
  
    const respDecode = async (resp) =>{
        const formJson = await resp.arrayBuffer();   
        const decodeJson = textDecoder1.decode(formJson) 
        return JSON.parse(decodeJson);
    }

    const logout = (domain) =>{
        
        fetch(getDomain(domain) + "/logout",
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json;charset=UTF-8',
                                'Authorization':'Bearer ' + user().token
                                },
                    mode: 'cors',
                    cache: 'default', 
                }
            );
        sessionStorage.removeItem("user");
        navigate("/", {
            replace: true
        });
    }

    const navigateLoginPage = () =>{
        sessionStorage.removeItem("user");
        navigate("/", {
            replace: true
        }); 
    }

    const responseProcess = async(domain, response, resolve, reject)=>{
        if(response.ok){   
            let txtResponse = await response.text();
            if(txtResponse == undefined || txtResponse == null || txtResponse == ''){
                resolve(response.status, null);   
            }else{
                const jsonResult = JSON.parse(txtResponse);
                resolve(response.status, jsonResult);  
            }
            
            //const jsonResult = await response.json();
            
        }else{  
            if(response.status == 403){
                logout(domain);
            }else{  
                const jsonMessage = JSON.parse(await response.text());
                reject(response.status, jsonMessage.message);    
            }
        }
    }

    const get = ({domain, url, headers}, resolve, reject) =>{   
        
        let cheaders;
        if(headers != undefined){
            cheaders = headers
        }else{ 
            cheaders = {'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization':'Bearer ' + user().token
            };
        }
        
        let init =  {
                method: 'GET',
                headers: cheaders,
                mode: 'cors',
                cache: 'default' 
            }; 
        fetch(getDomain(domain) + "/" + url, init).
            then(async(response) =>{
               await  responseProcess(domain, response, resolve, reject); 
            }, err =>{
                navigateLoginPage(); 
            }
        )  
    }

    const post = ({domain, url, data, headers, encrypt}, resolve, reject) =>{   

        let cheaders;
        if(headers != undefined){
            cheaders = headers
        }else{ 
            cheaders = {'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization':'Bearer ' + user().token
            };
        }


        let init = {}; 
        if(data != null && data != undefined){
            let cdata = JSON.stringify(data);
            if(encrypt != undefined){
                cdata = JSON.stringify({value:AES.encrypt(cdata, encrypt).toString()});
            }
            init = {
                method: 'POST',
                headers: cheaders,
                mode: 'cors',
                cache: 'default',
                body: cdata
                };
        }else{
            init = {
                method: 'POST',
                headers: cheaders,
                mode: 'cors',
                cache: 'default', 
            }; 
        }
          

        fetch(getDomain(domain) + "/" + url, init).
            then(async(response) =>{
                responseProcess(domain, response, resolve, reject); 
            }, err =>{
                navigateLoginPage(); 
            }
        ) 
  
    }

    const put = ({domain, url, data, headers, encrypt}, resolve, reject) =>{   
        let cheaders;
        if(headers != undefined){
            cheaders = headers
        }else{ 
            cheaders = {'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization':'Bearer ' + user().token
            };
        }
       
        let init = {};
        if(data != null && data != undefined){
            let cdata = JSON.stringify(data);
            if(encrypt != undefined){ 
                cdata = JSON.stringify({value:AES.encrypt(cdata, encrypt).toString()});
            }
            init = {
                method: 'PUT',
                headers: cheaders,
                mode: 'cors',
                cache: 'default',
                body: cdata
                };
        }else{ 
            init = {
                method: 'PUT',
                headers: cheaders,
                mode: 'cors',
                cache: 'default', 
            }; 
        }  
 
        fetch(getDomain(domain) + "/" + url, init).
            then(async(response) =>{
                responseProcess(domain, response, resolve, reject); 
            }, err =>{  
                navigateLoginPage(); 
            }
        )
    }


    const del = ({domain, url, data, headers, encrypt}, resolve, reject) =>{   
        let cheaders;
        if(headers != undefined){
            cheaders = headers
        }else{ 
            cheaders = {'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization':'Bearer ' + user().token
            };
        }
       
        let init = {};
        if(data != null && data != undefined){
            let cdata = JSON.stringify(data);
            if(encrypt != undefined){ 
                cdata = JSON.stringify({value:AES.encrypt(cdata, encrypt).toString()});
            }
            init = {
                method: 'DELETE',
                headers: cheaders,
                mode: 'cors',
                cache: 'default',
                body: cdata
                };
        }else{ 
            init = {
                method: 'DELETE',
                headers: cheaders,
                mode: 'cors',
                cache: 'default', 
            }; 
        }  
 
        fetch(getDomain(domain) + "/" + url, init).
            then(async(response) =>{
                responseProcess(domain, response, resolve, reject); 
            }, err =>{  
                navigateLoginPage(); 
            }
        )
    }

    const download = ({domain, code}) =>{ 
        const header = {'Content-Type': 'application/json; charset=UTF-8',
        'Authorization':'Bearer ' + user().token
        };

        myInit = {
            method: 'GET',
            headers: header,
            mode: 'cors',
            cache: 'default',
            responseType: 'blob' 
        };

        return fetch(getDomain(domain)  + "/document/download?code=" + code, myInit); 
        /**resp = fetch(getDomain(domain)  + "/document/download?code=" + code, myInit); 
        
        const reader = new FileReader();
        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();

        return reader.readAsDataURL(blob);*/
    
    }
   
    const upload = ({domain, url, data, headers, encrypt}, resolve, reject) =>{   
     
        let cheaders;
        if(headers != undefined){
            cheaders = headers
        }else{ 
            cheaders = { 'Authorization':'Bearer ' + user().token
            };
        }
       
        if(encrypt != undefined){
            data = AES.encrypt(data, encrypt)
        }
        let init =  {
                method: 'POST',
                headers: cheaders,
                mode: 'cors',
                cache: 'default',
                body: data
                };
 
        fetch(getDomain(domain) + "/" + url, init).
            then(async(response) =>{
                responseProcess(domain, response, resolve, reject); 
            }, err =>{  
                navigateLoginPage(); 
            }
        )
    }


    const getDomain = (domain)=>{
       return (domain != undefined && domain != null && domain != '')? domain: defaultDomain; 
    }


    const makeid = (length) =>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    return (
    {get, post, put, del, download, upload, logout, respDecode}
    )
}
