import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './login.css';

function Login(){
    const [signindata, setSigninData] = useState({email:"",password:""});
    const navigator=useNavigate();
    const onSignin=(e)=>{
        e.preventDefault();
        fetch("https://backend-deployement.onrender.com",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:signindata.email,
                password:signindata.password
             
            }),
        }).then(res=>res.json())
        .then((data)=>{
            console.log(data);
            if(data.message){
                return alert(data.message);
            }

            window.localStorage.setItem("id", data.user._id);
            window.localStorage.setItem("email", data.user.email);
            window.localStorage.setItem("token", data.user.token);
            alert("user signin successfully");
            navigator("/home")

        });
    };
useEffect(()=>{
    if(localStorage.getItem("token")){
        navigator("/home")
    }
},[])
    return (
        <>
            <div className='login-main'>
            <div className='login-box'>
                    <div className='logo'>SIGN IN</div>
                    <form className='login-form'>
                        <input className='login-input' type="email" placeholder="User ID" name="email" required onChange={(e)=>{setSigninData({...signindata, email:e.target.value})}}/><br/>
                        <input className='login-input' type="password" placeholder="Enter password" name="password" required onChange={(e)=>{setSigninData({...signindata, password:e.target.value})}}/> <br/>
                        <button className='login-btn' type='submit' onClick={onSignin} >Sign In</button>  
                
                    </form>
                    <div id='login-a'>
                        <Link to={"/register"}>Sign Up</Link>
                    </div>
                    </div>
                    </div>
        </>
    )
}
export default Login;