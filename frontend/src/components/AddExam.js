import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
export default function AddExam(props) {
    var [fromdate, setFromdate] = useState(new Date().toISOString().slice(0, 16))
    var [todate, setTodate] = useState(new Date().toISOString().slice(0, 16))
    const [questions, setQuestions] = useState(['']);
    var [currentUser, setCurrentUser] = useState({ username: "loading...", email: "loading...", role: "loading" })
    useEffect(() => {
        if (document.cookie.indexOf("loginAIScrutiny") !== -1) {
            console.log(document.cookie.split("loginAIScrutiny="))
            console.log(JSON.parse(document.cookie.split("loginAIScrutiny=")[1]))

            setCurrentUser(JSON.parse((document.cookie.split("loginAIScrutiny=")[1])))
        }
        else {

        }
    }, [])
    useEffect(() => {
        console.log(new Date(fromdate).toLocaleString());
    }, [fromdate])
    async function addExam(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        formObject["questions"] = questions
        formObject["professorEmail"] = currentUser.email
        formObject["professorID"] = currentUser.username
        const date1 = new Date(formObject["fromDate"]);
        const date2 = new Date(formObject["toDate"]);
        if (date1 >= date2) {
            // console.log("set date");
            alert("Set Dated properly")
            toast.warn("Set the dates properly")
        }
        else {
            var request = await fetch("http://localhost/addexam", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(formObject)
            })
            var response=await request.json()
            if (response["status"] == "success") {
                alert("Exam added Succesfully")
                toast.success(response["message"])
                document.getElementById("closemodalbutton").click()
            }
            else {
                toast.warn(response["message"])
            }
        }
        console.log(formObject);
    }
    function addquestion() {

        setQuestions((prevquestions) => {
            return [...prevquestions, '']
        })
    }
    function removequestion(index) {
        if (questions.length != 1) {
            setQuestions(questions.slice(0, index).concat(questions.slice(index + 1)))
        }

    }
    function handleQuestions(event, index) {
        setQuestions((prevQuestions) => {
            const newQuestions = [...prevQuestions];
            newQuestions[index] = event.target.value;
            return newQuestions;
        });
    }
    return (
        <div className="add_exam_page">
            
            <div className="container">
                <form onSubmit={addExam}>
                <ToastContainer theme="colored" />
                    <div className="p-2">
                        <label className="py-1" for="subject">Subject: &nbsp;</label>
                        <input className="p-2 w-100 rounded" type="text" name="subject" id="subject" placeholder="Ex. Mathematics" required />

                    </div>
                    <div className="p-2">
                        <label className="py-1" for="semester">Semester: &nbsp;</label>
                        <input className="p-2 w-100 rounded" type="text" name="semester" id="semester" placeholder="Ex. Fall 2024" required />
                    </div>
                    <div className="p-2">
                        <label className="py-1" for="fromDate">From Date: &nbsp;</label>
                        <input
                            type="datetime-local"
                            className="p-2 rounded w-100"
                            id="fromDate"
                            name="fromDate"
                            value={fromdate}
                            onChange={(event) => {
                                setFromdate(event.target.value)
                            }} required />
                    </div>
                    <div className="p-2">
                        <label className="py-1" for="toDate">To Date: &nbsp;</label>
                        <input
                            type="datetime-local"
                            className="p-2 rounded w-100"
                            id="toDate"
                            name="toDate"
                            value={todate}
                            onChange={(event) => {
                                setTodate(event.target.value)
                            }} required />
                    </div>
                    <label className="py-1 p-2" for="question">Questions:</label><span className="post_button p-2 rounded mx-1 " onClick={addquestion} style={{ width: "fit-content" }}>&#43;</span> <br />
                    {/* <div id="questions" name="questions"> */}
                    {questions.map((question, index) => {
                        return <div className="p-2" key={index}>


                            <input
                                type="text"
                                className="p-2 rounded "
                                id="question"
                                // name="question"
                                value={question}
                                onChange={(event) => handleQuestions(event, index)}
                                required />
                            <span className="post_button p-2 mx-1 rounded" onClick={() => removequestion(index)} style={{ width: "fit-content" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 35" width="20" height="40" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" /></svg></span>
                        </div>
                    })}
                    {/* </div> */}

                    <div className="px-2">
                        <button type="submit" className=" rounded post_button">Post Exam</button>
                        <button type="reset" id="closemodalbutton" onClick={props.toggleModal} className="m-3 rounded cancel_button">Cancel</button>
                    </div>

                </form>
            </div>


        </div>
    )
}