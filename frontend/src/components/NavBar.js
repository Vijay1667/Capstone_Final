import React, { useEffect, useLayoutEffect, useState } from "react";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { gsap } from "gsap/dist/gsap";

import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import SplitText from "gsap-trial/SplitText";
export default function Navbar() {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrambleTextPlugin);
    var [overlayStatus, setOverlayStatus] = useState("none")
    var [user_display, setUser_display] = useState(false);
    var [currentUser, setCurrentUser] = useState({ username: "",email:"" })
    const navigate = useNavigate();
    useEffect(() => {
        if (document.cookie.indexOf("loginAIScrutiny") != -1) {
            console.log(document.cookie.split("loginAIScrutiny="))
            console.log(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]))
            setUser_display(true);
            setCurrentUser(JSON.parse((document.cookie.split("loginAIScrutiny=")[1])))
        }
        else {
            setUser_display(false);
        }
        // var tl = gsap.timeline()
        // var typeSplit = new SplitText('.overlay ', {
        //     types: 'lines, words, chars',
        //     tagName: 'span',
        // })
        // gsap.set(".overlay ", { perspective: 400 });
        // var chars = typeSplit.lines
        // tl.from(chars, {
        //     yoyo: true,
        //     y: '100%',
        //     opacity: 0,
        //     duration: 0.4,
        //     ease: 'sine.in',
        //     stagger: 0.1,

        // })
    }, [])
    console.log(currentUser);
    useEffect(() => {
        gsap.to("#scramble1", { duration: 3, scrambleText: { text: "AI ", chars: "_/-|\#\$", revealDelay: 0, tweenLength: false } })
        gsap.to("#scramble2", { duration: 2, scrambleText: { text: " Scrutiny", chars: "~*_/-|$#\\", revealDelay: 0.5, tweenLength: true } })
    }, [])
    // useEffect(() => {

    //     document.getElementById("nav_overlay").style.visibility = "hidden"
    //     document.getElementById("nav_overlay").style.height = "0"
    // }, [])
    function openoverlay(event) {
        // console.log(document.getElementsByClassName("test01")[0].style)

        if (overlayStatus == "none") {
            setOverlayStatus("")
            document.getElementById("nav__line-1").setAttribute("transform", "rotate(45 14 17)")
            document.getElementById("nav__line-2").setAttribute("transform", "translate(150,0)")
            document.getElementById("nav__line-3").setAttribute("transform", "rotate(-45 14 51)")
            document.getElementById("nav_overlay").style.visibility = "visible"
            document.getElementById("nav_overlay").style.height = "100vh"

        }
        else {
            document.getElementById("nav__line-1").removeAttribute("transform")
            document.getElementById("nav__line-2").removeAttribute("transform")
            document.getElementById("nav__line-3").removeAttribute("transform")
            document.getElementById("nav_overlay").style.visibility = "hidden"
            document.getElementById("nav_overlay").style.height = "0"
            setOverlayStatus("none")
        }
    }
    function logout() {
        document.cookie = "loginAIScrutiny=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser_display(false); 
        navigate("/")
        window.location.reload()

    }
    return (




        <div className="nav-head " >
            <div className="d-flex flex-row justify-content-between" >
                <Link to="/" style={{ textDecoration: "none" }} className="p-4 scramble">
                    <span style={{ color: "rgb(255, 102, 0)" }} id="scramble1"> </span>
                    <span style={{ color: "white" }} id="scramble2"> </span>
                </Link>
                <div onClick={openoverlay} className="nav-button d-flex align-items-center justify-content-center" >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="100" height="93" viewBox="0 0 100 93" fill="none"> */}
                    {/* <rect width="10" height="93" fill="black" /> */}
                    {/* <line id="line-1" x1="15" y1="24.5" x2="85" y2="24.5" stroke="white" stroke-width="2" transform="rotate(45 15 24.5)" /> */}
                    {/* <line id="line-2" x1="15" y1="44.5" x2="85" y2="44.5" stroke="white" stroke-width="2" /> */}
                    {/* <line id="line-3" x1="15" y1="67.5" x2="85" y2="67.5" stroke="white" stroke-width="2" transform="rotate(-45 15 67.5)" /> */}
                    {/* </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 0 76 70" fill="none">

                        <line id="nav__line-1" x1="12" y1="17" x2="63" y2="17" stroke="white" stroke-width="3" />
                        <line id="nav__line-2" x1="25" y1="34" x2="63" y2="34" stroke="white" stroke-width="3" style={{ stroke: "rgb(255, 102, 0)" }} />
                        <line id="nav__line-3" x1="12" y1="51" x2="63" y2="51" stroke="white" stroke-width="3" />
                    </svg>
                </div>
            </div>
            <hr className="m-0" style={{ color: "white", textDecoration: "none" }} />

            <div id="nav_overlay" className=" overlay d-flex flex-column justify-content-center align-items-center " >
                {user_display ? <div>
                    <div className="py-3">
                        <Link to={currentUser.role=="student" ? "/user" : "/prof"} className=" overlay-item">{currentUser["username"]}</Link>
                    </div>
                    <div className="py-3">
                        <Link to={currentUser.role=="student" ? "/exams" : "/prof"} className=" overlay-item">Exams</Link>
                    </div>
                    <div className="py-3">
                        <Link onClick={logout} className=" overlay-item">Logout</Link>
                    </div>
                </div> :
                    <div>
                        <div>
                            <Link className="pb-3 overlay-item"> About</Link>
                        </div>
                        <div>
                            <Link to="/login" className="pb-3 overlay-item">Login</Link>
                        </div>
                        <div>
                            <Link to="/signup" className="pb-3 overlay-item">Sign Up</Link>
                        </div>
                    </div>}



            </div>
        </div>



    )
}

