import React from "react";
import { useEffect,useState} from "react";


export default function Home (){
    const [state,setState]= useState(false);


    const cerrarSesion=()=>{
        sessionStorage.removeItem("myData")
    }


    useEffect(()=>{
        window.setInterval(()=>{
            console.log("medio segundo paso")
            chequeoToken();
        },500)
    },[]);


    const chequeoToken=()=>{
        if (!sessionStorage.getItem("myData")){
            console.log(sessionStorage.getItem('myData'))
            console.log('no hay token');
            window.location.href='./';
        }
    }

        return(
            <div>
                Hola estas en home
                tu token es:
                {sessionStorage.getItem("myData")}
                <br/>
                <button onClick={()=>cerrarSesion()}>Cerrar Sesion </button>
            </div>
        )
    
}
