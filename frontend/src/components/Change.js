import React, { useEffect, useState } from "react";

import Navbar from "./NavBar";
import { socket } from "./socket";
import { useNavigate } from "react-router-dom";
import Error from "./404Error";
export default function Exams() {
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(socket.connected);
    var [user_display, setUser_display] = useState(false);
    var [currentUser, setCurrentUser] = useState({ username: "", email: "" })
    var [exams, setExams] = useState([]);
    var [previousexams, setPreviousexams] = useState([]);
    async function onLoad() {
        const request = await fetch("http://localhost/examsSchedule")
        const response = await request.json();
        console.log(response);
        console.log(typeof (response));
        console.log(Array.isArray(response));
        if (Array.isArray(response)) {
            setExams(response);
        }
    }
    async function prevExams() {
        const request = await fetch("http://localhost/previousExams")
        const response = await request.json();
        console.log(response);
        console.log(typeof (response));
        console.log(Array.isArray(response));
        if (Array.isArray(response)) {
            setPreviousexams(response);
        }
    }
    useEffect(() => {
        if (document.cookie.indexOf("loginAIScrutiny") != -1) {
            console.log(document.cookie.split("loginAIScrutiny="))
            console.log(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]))
            if (JSON.parse(document.cookie.split("loginAIScrutiny=")[1])["role"] == "student") {
                setUser_display(true);
                setCurrentUser(JSON.parse((document.cookie.split("loginAIScrutiny=")[1])))
            }

        }
        else {
            setUser_display(false);
        }
    }, [])
    useEffect(() => {
        onLoad();
        prevExams();

    }, [])
    useEffect(() => {
        function handleExams(fulldocument) {
            setExams(fulldocument)
        }
        function handlePreviousexams(fulldocument) {
            setPreviousexams(fulldocument)
        }
        socket.on("update", handleExams);
        socket.on("previous", handlePreviousexams);
        return () => {
            socket.off('update', handleExams);
            socket.off('previous', handlePreviousexams);
        };


    }, [])


    return (
        <div>
            
            {user_display == true ? <div><Navbar /><div className="exams_page p-2">
                {Array.isArray(exams) ? exams.map((exam, index) => {
                    return <div className="container each_exam rounded p-3 my-2" key={index} onClick={() => navigate(`/user/exam/${exam["_id"]}`, { state: { examid: exam._id,questions:exam.questions } })}>
                        <div className="row">
                            <div className="col-md-3 col-6 p-2">
                                <span style={{ fontSize: "large", fontWeight: "600" }}> {exam.subject + " id:" + exam["_id"]}</span>
                            </div>
                            <div className="col-md-3 col-6 p-2">
                                {exam.semester}
                            </div>
                            <div className="col-md-6 col-12">
                                Valid from <span style={{ color: "#FF4000", fontWeight: 600 }}> {exam.fromDate}</span> to <span style={{ color: "#FF3000", fontWeight: 600 }}>{exam.toDate}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-2">
                                Assigned by <a style={{ color: "#FF6600" }} href={`mailto:${exam.professorEmail}`}> {exam.professorEmail}</a> - {exam.professorID}
                            </div>
                        </div>
                    </div>
                }) : <div>No exams scheduled now, check back later</div>}
                <div className="container py-3">
                    <div className="row">
                        <div className="col">
                            <hr style={{ border: "2px grey dashed" }} />
                        </div>
                        <div className="col rounded d-flex align-items-center justify-content-center text-center" style={{ backgroundColor: "black", color: "white", fontWeight: "600" }}>
                            Completed Exams
                        </div>
                        <div className="col">
                            <hr style={{ border: "2px grey dashed" }} />
                        </div>
                    </div>
                </div>
                {Array.isArray(exams) ? previousexams.map((exam, index) => {
                    return <div className="container each_exam rounded p-3 my-2" key={index} onClick={() => navigate(`/user/view/${exam["_id"]}`, { state: { examid: exam._id,username:currentUser.username } })}>
                        <div className="row">
                            <div className="col-md-3 col-6 p-2">
                                <span style={{ fontSize: "large", fontWeight: "bold" }}> {exam.subject}</span>
                            </div>
                            <div className="col-md-3 col-6 p-2">
                                {exam.semester}
                            </div>
                            <div className="col-md-6 col-12">
                                Valid from <span style={{ color: "#FF4000", fontWeight: 600 }}> {exam.fromDate}</span> to <span style={{ color: "#FF3000", fontWeight: 600 }}>{exam.toDate}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-2">
                                Assigned by <a style={{ color: "#FF6600" }} href={`mailto:${exam.professorEmail}`}> {exam.professorEmail}</a> - {exam.professorID}
                            </div>
                        </div>
                    </div>
                }) : <div>No previous exams given</div>}
            </div></div> : <Error />}


        </div>
    )

}