import React, { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Error from "./404Error";
import ReactModal from "react-modal";
import AddExam from "./AddExam";
import { ToastContainer, toast } from 'react-toastify';
export default function ProfDashboard() {
    var [currentProf, setCurrentProf] = useState({ role: null, username: null });
    var [exams, setExams] = useState([])
    var [openmodal, setOpenmodal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (document.cookie.indexOf("loginAIScrutiny") != -1) {
            if (JSON.parse(document.cookie.split("loginAIScrutiny=")[1])["role"] == "professor") {
                setCurrentProf(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]));
                getProfessorExams(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]).username)        //FINAL DEP
            }
            else {
                console.log("NOT A PROFESSOR");
            }
        }
        // getProfessorExams("70145")

    }, [])
    async function getProfessorExams(username) {
        var request = await fetch("http://localhost/getProfessorExams", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // specify content type as JSON
                "Connection": "keep-alive"
            },
            body: JSON.stringify({ "username": username })
        })
        var response = await request.json()
        setExams(response)
    }
    function toggleModal() {
        setOpenmodal(!openmodal)
    }
    return (
        <div>

            {currentProf?.role == "professor" ? <div>
                <ReactModal  isOpen={openmodal} ariaHideApp={false}>
                    <AddExam  toggleModal={toggleModal} />
                    <ToastContainer theme="colored" />
                </ReactModal>
                <Navbar /><div className="prof_page">
                    <div className="container p-1">
                        <span style={{ fontSize: "larger" }}>Welcome {currentProf.username}</span>

                    </div>
                    <div className="container">
                        Your exams,
                        {exams.length != 0 ? exams.map((exam, index) => {
                            return <div className="container each_exam rounded p-3 my-2" key={index} onClick={() => { navigate(`/prof/exam/${exam["_id"]}`, { state: { ...exam, examid: exam._id, submissions: exam.submissions } }) }}>
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
                                <div className="row">
                                    <div className="col p-2">
                                        Submissions: {exam.submissions.length}
                                    </div>
                                </div>
                            </div>
                        }) : "You have no exams scheduled"}

                    </div>
                    <div className="position-fixed bottom-0 end-0 my-4 me-4">
                        <button className="p-3 rounded add_question"  onClick={toggleModal}>Post Exam</button>
                    </div>
                </div></div> : <Error />}

        </div>
    )
}