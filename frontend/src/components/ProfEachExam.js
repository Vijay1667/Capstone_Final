import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./NavBar";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Error from "./404Error";
import { PacmanLoader } from "react-spinners"

export default function ProfEachExam(props) {
    var [currentProf, setCurrentProf] = useState({ role: null, username: "70145" });
    const { state } = useLocation();
    const { examid } = useParams()
    var [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    var [submissions, setSubmissions] = useState([])
    var [results, setResults] = useState({})
    async function PostAnswers(event) {
        event.preventDefault();
        setLoading(true)
        if (Object.keys(results) == 0) {
            toast.warn("First Evaluate the papers & then try")
        }
        else {
            var request = await fetch("http://localhost/postResult", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ "examid": state.examid,"results":results })
            })
            var response = await request.json();
            if(response["status"]=="success"){
                toast.success(response["message"])
            }
            else{
                toast.warn(response["message"])
            }
            setLoading(false)
        }
    }
    async function EvaluateAnswers(event) {
        event.preventDefault();
        setLoading(true)
        var request = await fetch("http://localhost/evaluate", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ "examid": state.examid })
        })
        var response = await request.json();
        console.log(response);
        if (response["status"] == "success") {
            toast.success(response["message"])
            setResults(response)
        }
        else {
            toast.warn(response["message"])
        }
        setLoading(false)
    }
    useEffect(() => {
        if (document.cookie.indexOf("loginAIScrutiny") != -1) {
            if (JSON.parse(document.cookie.split("loginAIScrutiny=")[1])["role"] == "professor") {
                setCurrentProf(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]));
            }
            else {
                // console.log("NOT A PROFESSOR");
            }
        }
        // console.log(props);
        // console.log(state);
        // console.log(examid);
        setSubmissions(state.submissions)
    }, [])
    return (
        <div>
            {currentProf?.role == "professor" ? <div>
                <Navbar />
                <ToastContainer theme="colored" />
                {(state != null && state?.examid === examid) ? <div>
                    <div className="prof_page p-2">
                        <div className="container-fluid ">
                            <div className="row">
                                <div className="col-md-3 col-6 p-2">
                                    <span style={{ fontSize: "large", fontWeight: "600" }}> {state.subject}</span>
                                </div>
                                <div className="col-md-3 col-6 p-2">
                                    {state.semester}
                                </div>
                                <div className="col-md-6 col-12">
                                    Valid from <span style={{ color: "#FF6600", fontWeight: 600 }}> {state.fromDate}</span> to <span style={{ color: "#FF6600", fontWeight: 600 }}>{state.toDate}</span>
                                </div>
                            </div>
                            {state.questions.map((question, index) => {
                                // console.log(question);
                                return <div className="container d-flex flex-row justify-content-between align-items-center p-3 rounded my-2 each_question" key={index}> <div>{index + 1}. {question}</div>
                                    <div> <button className="p-2 px-3 rounded upload_button" onClick={() => { navigate(`/prof/exam/${examid}/${index}`, { state: { examid: state.examid, questionno: index } }) }}>Upload</button>  </div> </div>
                            })}

                            <div className=" ">
                                <button onClick={PostAnswers} disabled={loading} className="upload_button p-3 rounded">{!loading ? " Post Answers" :
                                    <div className="d-flex justify-content-center">
                                        <PacmanLoader color="#000" size="12" className="PacmanLoaders" /></div>}</button>
                                <div className="float-end">
                                    <button onClick={EvaluateAnswers} disabled={loading} className="upload_button p-3 rounded">{!loading ? " Evaluate Answers" :
                                        <div className="d-flex justify-content-center">
                                            <PacmanLoader color="#000" size="12" className="PacmanLoaders" /></div>}</button>
                                </div>
                            </div>

                            {/* </div> */}
                            <div className="row">
                                <div className="col p-2">
                                    Assigned by <a style={{ color: "#FF6600" }} href={`mailto:${state.professorEmail}`}> {state.professorEmail}</a> - {state.professorID}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col p-2">
                                    Submissions: {state.submissions.length}
                                </div>
                            </div>
                        </div>
                        {submissions.map((eachsub, index) => {
                            return <div className="container-fluid" key={index}>
                                {/* {console.log(eachsub)} */}
                                <div className="container-fluid">
                                    <div>Submission of user: {eachsub.username}</div>
                                    {/* {console.log(Object.values(eachsub.answers))} */}
                                    <div className="">
                                        {Object.values(eachsub.answers).map((eashques, quesindex) => {

                                            return <div className="row d-flex p-2 justify-content-center" key={quesindex}> <div> Submission for Question {quesindex + 1}</div>
                                                {console.log(results?.[eachsub.username])}
                                                {console.log(results?.[eachsub.username]?.[quesindex])}
                                                <div className="p-2">{(results?.[eachsub.username]?.[quesindex]) ? <div className="container semantic-res rounded p-2" style={{ fontSize: "large", fontWeight: "500", backgroundColor: "#FF66006b", color: "black" }}> {"The Evaluated Score is " + results?.[eachsub.username]?.[quesindex]} </div> : ""} </div>
                                                {eashques.map((file, index) => {
                                                    // console.log(file);
                                                    // var blob = new Blob([file.buffer.slice(0, file.size)], { type: file.mimetype });
                                                    // Create a data URL from the Blob
                                                    // var imageUrl = URL.createObjectURL(blob);
                                                    // var myfile = new File([blob], file.originalname, { type: file.mimetype })
                                                    // console.log(myfile);
                                                    // const imageUrl = URL.createObjectURL(myfile);
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
                                        })}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div> : <Error />}
            </div> : <Error />}
        </div>
    )

}