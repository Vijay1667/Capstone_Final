import React, { useEffect } from "react";
import Navbar from "./NavBar";
import { useState } from "react";
export default function User() {
    var [currentUser, setCurrentUser] = useState({ username: "loading...",email:"loading...",role:"loading" })
    useEffect(() => {
        if (document.cookie.indexOf("loginAIScrutiny") !== -1) {
            console.log(document.cookie.split("loginAIScrutiny="))
            console.log(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]))
            
            setCurrentUser(JSON.parse((document.cookie.split("loginAIScrutiny=")[1])))
        }
        else {
            
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className="home_page container">
                Welcome {currentUser["username"]}
            </div>
            <div className="container">

            </div>
        </div>
    )
}