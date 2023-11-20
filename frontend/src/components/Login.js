import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners"
export default function Login() {
    var [role, setRole] = useState("student")
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [limit, setLimit] = useState("9");
    var [placeholder, setPlaceholder] = useState("Registration No. *");
    const navigate = useNavigate();
    var [loading, setLoading] = useState(false)
    const location=useLocation()
    const toLocation=location.pathname || "/";
    async function loginSubmit(event) {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget); 
        // const formObject = {};

        // formData.forEach((value, key) => {
        //     formObject[key] = value;
        // });
        setLoading(true)
        // console.log(formObject);
        const request = await fetch("http://localhost/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ "username": username, "role": role, "password": password })
        })
        const response = await request.json();
        console.log(response);
        if (response["status"] == "success") {
            toast.success(response["message"])
            document.cookie = "loginAIScrutiny=" + JSON.stringify(response) + ";expires=" + new Date().getTime() + (1 * 60 * 60 * 1000);
            navigate("/")
            window.location.reload()
        }
        else {
            toast.warn(response["message"])
        }
        setLoading(false)
    }
    return (
        <div>
            <Navbar />
            <ToastContainer theme="colored" />
            <div className="login_page container-fluid">
                <div className="row">
                    <div className="col-md-3 col-0 ">

                    </div>
                    <div className="col-md-6 col-12 text-center login_box d-flex flex-column justify-content-center  " >
                        <div className="login_text py-1">
                            Login
                        </div>
                        <div className="py-3">
                            <svg className="login_svg" viewBox="0 0 200 200" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 0C44.9 0 0 44.9 0 100C0 155.1 44.9 200 100 200C155.1 200 200 155.1 200 100C200 44.9 155.1 0 100 0ZM98 47.7C115.8 47.7 130.2 62.1 130.2 79.9C130.2 97.6 115.8 112.1 98 112.1C80.3 112.1 65.9 97.6 65.9 79.9C65.9 62.1 80.3 47.7 98 47.7ZM159.3 160.8C154.8 165.3 149.7 169.2 144.3 172.5C131.4 180.5 116.2 185 100 185C83.8 185 68.6001 180.5 55.7001 172.5C50.3001 169.2 45.2001 165.3 40.7001 160.8V158.9C40.7001 138.4 57.4 121.7 77.8 121.7H122.2C142.6 121.7 159.3 138.4 159.3 158.9V160.8Z" fill="#FF6600" />
                            </svg>

                        </div>
                        <form onSubmit={loginSubmit}>
                            <div className="login_box_2 py-3 d-flex justify-content-center">
                                <div className="d-flex align-items-center">
                                    <input onChange={(event) => { setRole(event.target.value); setLimit("9"); setPlaceholder("Registration No. *") }} name="role" id="student" value="student" type="radio" defaultChecked />
                                    <label className="pe-4 w-50 px-2" for="student">Student</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input onChange={(event) => { setRole(event.target.value); setLimit("5"); setPlaceholder("Employee ID *") }} name="role" id="professor" value="professor" type="radio" />
                                    <label className="pe-4 w-50 px-2" for="professor">Professor</label>
                                </div>
                            </div>
                            <div className="">
                                <div className="py-2">
                                    <input onChange={(event) => { setUsername(event.target.value.toUpperCase()) }} required className="p-3 rounded" placeholder={placeholder} minLength={limit} maxLength={limit} type="text" name="username" id="username" />
                                </div>
                                <div className="py-2">
                                    <input onChange={(event) => { setPassword(event.target.value) }} required className="p-3 rounded" placeholder="Password" type="password" name="password" id="password" />
                                </div>
                            </div>
                            <div className="py-2">
                                Don't have an Account? <Link to="/signup" style={{ color: "#FF6600" }}> Sign up</Link>

                            </div>
                            <div className="py-3">
                                <button type="submit" disabled={loading} className="login_button   rounded p-3">{!loading ? "Login" :
                                    <div className="d-flex justify-content-center">
                                        <PacmanLoader color="#fff" size="12" className="PacmanLoaders" /></div>}</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3 col-0 ">

                    </div>
                </div>
            </div>
        </div>
    )
}