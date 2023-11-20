import React, { useState } from "react";
import Navbar from "./NavBar";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import Error from "./404Error";

export default function UserExam(props) {
    const { state } = useLocation();
    const { examid } = useParams();
    const navigate = useNavigate();
    var [user_display, setUser_display] = useState(false);
    useState(()=>{
        console.log(state);
        console.log(examid);
    },[])
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
                <div>
                    {state.questions.map((question,index)=>{
                        console.log(question);
                        return <div className="container d-flex flex-row justify-content-between align-items-center p-3 rounded my-2 each_question" key={index}> <div>{index+1}. {question}</div>
                        <div> <button className="p-2 px-3 rounded upload_button" onClick={()=>{navigate(`/user/exam/${examid}/${index}`, { state: { examid: state.examid,questionno:index }})}}>Upload</button>  </div> </div>
                    })}

                </div></div> : <div><Navbar /> <div className="home_page content-2">Not a valid exam, please go back </div> </div>}
        </div>
    </div>
}