import React from "react";
import '../css/Login.css';
import {useState,useEffect} from 'react'


const baseUrl="https://api-global-authentication-deployment.emergencias.com.ar/auth/login"

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


export default function Login (){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [estadoerror,setEstadoerror]=useState(true);


    const handleChangeUser =async (data)=>{
        await setUsername(data.target.value)
        console.log(username);
    }
    const handleChangePass = async (data)=>{
        await setPassword(data.target.value)
        console.log(password);
    }

      
    const iniciarSeccion = ()=>{fetch(baseUrl, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "email": username,
            "password": password,
            "to": "IHSA_EMERCORE"
          }),
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {if (result.success ===true){
            setEstadoerror(true);
            console.log(estadoerror)
            sessionStorage.setItem("myData", result.data.access_token);
            // alert(sessionStorage.getItem("myData"));
            window.location.href='./home';

        }else{
            alert('el usuario no es correcto');
            setEstadoerror(false);
            console.log(estadoerror)

    }})
        .catch(error => console.log('error', error))
        
        ;}
    
        
    
    
    useEffect(()=>{
        if (sessionStorage.getItem("myData")){
            console.log(sessionStorage.getItem('myData'))
            window.location.href='./home';
        }
    })


    const mensajeError=()=>{
        if (estadoerror === true){
            return null
        }else{
            return (<label className="error-ingresar">Los datos ingresados no son correctos. Por favor, intenta nuevamente.</label>)
        }
    }
    

    
        return(
            <>
            <div className="rectangulo">
            <img className="logo" src="https://www.fundacionemergencias.org/wp-content/uploads/2019/05/logo-100-w.png" alt="Simply Easy Learning" width="200" height="80"/>
            {/* <div className="logo">emergencias</div> */}
            <div className="emercore">
                
                <p>Emercore</p>
            </div>
            <div className="ubicacion-login">

            
            <div className="containerPrincipal">

                <div className="title"><span>Inicio de sesión</span></div>
                <div className="sec-title"><span>*Campos obligatorios</span></div>
                <div className="containerSecundario">
                    <div className="form-group">
                        <label className={estadoerror ? "label-user":"label-user-negative"}>Correo electrónico*</label>
                        <br/>
                        <input type="text" className={estadoerror ? 'form-control':"form-control-negative"} name="username" onChange={handleChangeUser} placeholder="Username"/>
                        <br/>
                        <label className={estadoerror ? "label-user":"label-user-negative"}>Contraseña*</label>
                        <br/>
                        <div>
                        <i class="fa fa-key icon">
                        </i>
                        <input type="password" className={estadoerror ? 'form-control':"form-control-negative"} name="password" onChange={handleChangePass} placeholder="Password">
                        </input>
                        <i rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" class="fas fa-camera"></i>
                        {mensajeError()}
                        </div>
                                        
                    </div>
                </div>
                        <div className="forget-pass-div">
                            <button className="forget-pass">¿Olvidaste tu contraseña?</button>
                        </div>
                        <div className="btn-login-div">
                            <button onClick={iniciarSeccion} className="btn-login"><span>Iniciar sesión</span></button>
                        </div>
            </div>
            </div>
            </div>

            </>
        );
    
}

