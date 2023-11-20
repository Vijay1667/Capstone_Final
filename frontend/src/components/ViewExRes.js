import React, { useState } from "react";
import Navbar from "./NavBar";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useParams, useNavigate } from "react-router-dom";
export default function ViewExamRes() {
    const { state } = useLocation();
    const { examid } = useParams();
    const navigate = useNavigate();
    var [user_display, setUser_display] = useState(false);
    var [results, setResults] = useState({})
    async function getResults() {
        const request = await fetch("http://localhost/getUserResults", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ "examid": state.examid, "username": state.username })
        })
        const response = await request.json();
        console.log(response);

        if (response["status"] == "success") {
            toast.success(response["message"])
            setResults(response)
        }
        else {
            toast.warn(response["message"])
        }

    }
    useState(() => {
        // console.log(state);
        // console.log(examid);
        if (state != null && state?.examid === examid) {
            getResults()
        }

    }, [])
    // useEffect(() => {
    //     if (document.cookie.indexOf("loginAIScrutiny") != -1) {
    //         console.log(document.cookie.split("loginAIScrutiny="))
    //         console.log(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]))
    //         if (JSON.parse(document.cookie.split("loginAIScrutiny=")[1])["role"] == "student") {
    //             setUser_display(true);
    //             setCurrentUser(JSON.parse((document.cookie.split("loginAIScrutiny=")[1])))
    //         }

    //     }
    //     else {
    //         setUser_display(false);
    //     }
    // }, [])
    return <div>
        <div>
            {(state != null && state?.examid === examid) ? <div className="exams_page p-1">
                <Navbar />
                <ToastContainer theme="colored" />
                <div>
    
                    {results?.scripts && Object.values(results.scripts).map((eachques, index) => {
                        return <div className="container-fluid" key={index}>
                            {/* {console.log(eachsub)} */}
                            <div className="container-fluid">
                                <div>Your submission for question:{index + 1}</div>
                                {/* {console.log(Object.values(eachsub.answers))} */}
                                <div className="container semantic-res rounded p-2" style={{ fontSize: "large", fontWeight: "500", backgroundColor: "#FF66006b", color: "black" }}> {"The Evaluated Score is " + results?.results?.[state.username]?.[index]} </div> 


                                <div className="row d-flex justify-content-center">
                                    {eachques.map((file, index) => {

                                        return <div className={`each-file btn rounded p-2 m-1 col-md-3 col-6 `}>
                                                <div>{(index + 1) + "."}</div>
                                                <img className="" alt={file.originalname} src={`data:image/jpg;base64,${file.buffer}`} style={{ width: "100%" }} />
                                                {/* <div>{scores[index]}</div> */}
                                                {/* <button type="button" onClick={() => remove(index)} className="rounded btn-closed" >&#128473;</button> */}
                                                {/* <div className="container semantic-res p-2 m-1 rounded" style={{ backgroundColor: "#FF66006b", color: "black", fontWeight: "500" }}>
                                            Semantic Score: {semantics[index] != null ? semantics[index] : "upload..."}
                                        </div> */}
                                            </div>
                                        
                                    })}
                                </div>

                            </div>
                        </div>
                    })}
                </div></div> : <div><Navbar /> <div className="home_page content-2">Not a valid exam, please go back </div> </div>}
        </div>
    </div>
}