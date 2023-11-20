import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { useState,useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { PacmanLoader } from "react-spinners"
import Error from "./404Error";
export default function Upload() {
    const [file, setFile] = useState([]);
    const [bgcolor, setBgcolor] = useState("white");
    var [status, setStatus] = useState(["btn-primary", "btn-primary", "btn-primary"]);
    var [scores, setScores] = useState(["", "", ""]);
    var [statusUpload, setStatusUpload] = useState(true)
    const { examid, questionno } = useParams();
    var [semantics, setSemantics] = useState([]);
    var { state } = useLocation();
    var [user_display, setUser_display] = useState(false);
    var [currentUser, setCurrentUser] = useState({ username: "", email: "" })
    const fileInputRef = useRef(null);
    // console.log(state.examid);
    useEffect(() => {
        console.log(file);
        convertToText(file)
        console.log(state);
        console.log(typeof (file[0]));
    }, [file])
    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(e.target.files);
        console.log(Object.values({ ...e.target.files }));
        var flag = false;
        for (const element of Object.values({ ...e.target.files })) {
            if (!element.type.startsWith("image/")) {
                alert("Only images are allowed");
                break; // exit the entire function when a non-image file is found
            }
        }

        setFile(file.concat(Object.values({ ...e.target.files })).filter(element => element.type.startsWith("image/")));


    };
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
    
    const handleDragOver = (e) => {
        e.preventDefault();

        setBgcolor("rgb(223, 170, 116)")

    };
    const handleDrop = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        console.log(Object.values({ ...e.dataTransfer.files }));
        var flag = false;
        Object.values({ ...e.dataTransfer.files }).forEach(element => {
            if (!element.type.startsWith("image/")) {
                alert("Only images are allowed")
                return;
            }
        });
        setFile(file.concat(Object.values({ ...e.dataTransfer.files }).filter(element => element.type.startsWith("image/"))));
        setBgcolor("white")
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setBgcolor("white")
    }
    function remove(index) {
        console.log(index)
        //remove an particular indedx from array javascript
        setFile(file.slice(0, index).concat(file.slice(index + 1)))
        setSemantics(semantics.slice(0, index).concat(semantics.slice(index + 1)))
    }
    useEffect(() => {
        console.log("Semantics changed");
    }, [semantics])
    async function convertToText(file) {
        var promises=file.map(async (eachfile, index) => {
            var filetotext = new FormData();
            filetotext.append("image", eachfile)
            var request=await fetch('https://img-to-text-ten.vercel.app/text', {
                method: 'POST',
                mode: "cors",
                body: filetotext
            })
            var response=await  request.json()
            
                console.log(response);
                return response
        })
        var results=await Promise.all(promises)
        setSemantics([...results]);
    }
    async function handleUpload() {
        // alert("Success")
        setStatusUpload(false)
        var formData = new FormData();
        
        file.forEach(async (file1, index) => {
            console.log(file1.name);
            formData.append(`scripts`, file1);


        });
        formData.append('Examid', state.examid);
        formData.append('questionno', state.questionno);
        formData.append('answertext', semantics.join(" "));
        formData.append('username', currentUser.username);
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        const request = await fetch("http://localhost/upload", {
            method: "POST",
            mode: "cors",
            body: formData
        })
        const response = await request.json();
        setStatusUpload(true);
        if (response["status"] == "success") {
            toast.success(response["message"])

        }
        else {
            toast.warn(response["message"])
        }
        // console.log(response);
        // setSemantics(response)

    }
    function clearUpload() {
        setFile([]);
        document.getElementById("scripts").value=""

    }

    return (


        <div>
            {user_display == true ? <div>
                <NavBar />
                <ToastContainer theme="colored" />
                {(state?.examid == examid && state?.questionno == questionno) ? <div><div className=" upload_page container p-2">
                    <div name="scripts" draggable={true} onDrop={handleDrop} onDragEnter={handleDragOver} onDragExit={handleDragLeave} onDragLeave={handleDragLeave} onDragOver={handleDragOver} className="rounded upload_files text-center p-5 " style={{ backgroundColor: bgcolor, border: "3px dashed #FF6600" }}>
                        <i class="fa fa-upload" style={{ fontSize: "large" }}></i> Drag & Drop your files here  <input name="scripts" id="scripts" type="file" className="text-center rounded choose_files" accept="image/*" multiple onChange={handleFileInputChange} />

                    </div>
                    <div className="text-center my-2">
                        {file.length != 0 ? <button disabled={!statusUpload} onClick={handleUpload} className="p-2 px-3 rounded  upload_button">{statusUpload ? "Upload" : <div className="d-flex justify-content-center"><PacmanLoader color="#000" size="12" className="PacmanLoaders" /></div>}</button> : <></>}
                    </div>
                </div>
                    <div className="container-fluid ">
                        <div className="text-end  my-2" >
                            {file.length != 0 ? <button onClick={clearUpload} className="p-2 px-3 rounded upload_button">Clear All &#8634;</button> : <></>}
                        </div>
                        <div className="py-2 ">
                            <div className="row d-flex justify-content-center">
                                {file.map((file, index) => {
                                    console.log(index)
                                    const imageUrl = URL.createObjectURL(file);
                                    return <div className={`each-file  rounded p-2 m-2 col-md-3 col-6 `} key={index}>
                                        <div>{(index + 1) + ") "}</div>
                                        <img className="border" src={imageUrl} style={{ width: "100%" }} />
                                        <div>{scores[index]}</div>
                                        <button type="button" onClick={() => remove(index)} className="rounded btn-closed" >&#128473;</button>
                                        <div className="container semantic-res p-2 m-1 rounded" style={{ fontSize: "small", backgroundColor: "#FF66006b", color: "black", fontWeight: "400" }}>
                                            <span style={{ fontWeight: "500" }}>Text Extracted: </span> <span > {semantics[index] != null ? semantics[index] : "upload..."}</span>
                                        </div>
                                    </div>


                                })}
                            </div>
                        </div>
                    </div></div> : <div className="upload_page text-center" style={{ color: "red", fontSize: "xx-large" }}>Not a valid exam, I suggest you go back</div>}
            </div> : <Error />}

        </div>

    )
}