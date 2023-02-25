import React from 'react';
import './register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
    const [data, setData] = useState({ email: "", password: "", cpassword: "" })
    const navigator = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault()
        if (data.password !== data.cpassword) {
            return toast.error("password doesnot match")
        }
        fetch("https://recipe-app-deploy-0nf3.onrender.com/api/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                confirmpassword: data.cpassword
            })

        }).then(res => res.json())
            .then((data) => {
                if (data.message === "user already exists") {
                    return alert("user already exists")
                }
                toast.success("user registered successfully")
                navigator("/");
            })
    }
    return (
        <>
            <div className='main'>
                <div className='signup-box'>
                    <div className='logo'>SIGN UP</div>
                    <form className='signup-form'>
                        <input className='signup-input' type="email" placeholder="Enter emailId" name="email" required onChange={(e) => { setData({ ...data, email: e.target.value }) }} /><br />
                        <input className='signup-input' type="password" placeholder="Enter password" name="password" required onChange={(e) => { setData({ ...data, password: e.target.value }) }} /> <br />
                        <input className='signup-input' type="password" placeholder="confirm password" name="cpassword" required onChange={(e) => { setData({ ...data, cpassword: e.target.value }) }} /><br />
                        <input className='signup-checkbox' type="checkbox" required /><label>I agree with <a href='#'>Terms & Conditions</a></label><br />
                        <button className='signup-btn' type='submit' onClick={onSubmit} >Continue</button>
                    </form>
                    <div className='additional'>
                        <Link to={"/"}>Sign In</Link>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}
export default Register;