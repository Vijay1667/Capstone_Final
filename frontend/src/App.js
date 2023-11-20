
// import { useLayoutEffect } from 'react';
import './App.css';
import Home from './components/Home';
// import { gsap } from "gsap";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter, } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect } from 'react';
import User from './components/User';
import Error from './components/404Error';
import Upload from './components/Upload';
import { useState } from 'react';
import Exams from './components/Change';
import ProfDashboard from './components/Prof';
import ProfEachExam from './components/ProfEachExam';
import UserExam from './components/UserExam';
import ProfUpload from './components/ProfUpload';
import ViewExamRes from './components/ViewExRes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(document.cookie.indexOf("loginAIScrutiny") !== -1);
  useEffect(() => {
    console.log(isAuthenticated + ">>>> LOGIN");
  }, [isAuthenticated])
  // useLayoutEffect(() => {
  //   var bigCircle = document.querySelector('.bigclass');
  //   var smallCircle = document.querySelector('.smallclass');
  //   document.addEventListener("mouseenter", (event) => {
  //     document.getElementById("bigclass").style.visibility = "visible"
  //     document.getElementById("smallclass").style.visibility = "visible"
  //   })
  //   document.addEventListener("mouseleave", (event) => {
  //     document.getElementById("smallclass").style.visibility = "hidden"
  //     document.getElementById("bigclass").style.visibility = "hidden"
  //   })
  //   document.addEventListener("mousemove", (e) => {
  //     gsap.to(bigCircle, .6, {
  //       x: e.clientX,
  //       y: e.clientY
  //     })
  //     gsap.to(smallCircle, .2, {
  //       x: e.clientX,
  //       y: e.clientY
  //     })

  //   })

  // }, [])

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/user/exam/:examid/:questionno' element={document.cookie.indexOf("loginAIScrutiny") !== -1 ?  <Upload /> : <Error /> } />
          <Route path='/user/view/:examid/' element={document.cookie.indexOf("loginAIScrutiny") !== -1 ?  <ViewExamRes /> : <Error /> } />
          <Route path='/prof/exam/:examid/:questionno' element={document.cookie.indexOf("loginAIScrutiny") !== -1 ?  <ProfUpload /> : <Error /> } />
          <Route path="/exams" element={<Exams />} />
          <Route path='/prof/exam/:examid' element={<ProfEachExam/>}/>
          {/* <Route element={<Login/>} >
            <Route path='/upload' element={<Upload/>}/>
          </Route> */}
          <Route path="/prof" element={<ProfDashboard />} />
          <Route path={document.cookie.indexOf("loginAIScrutiny") !== -1 ? "/user/exam/:examid" : "/error"} element={document.cookie.indexOf("loginAIScrutiny") !== -1 ? <UserExam /> : <Error />} />
          <Route path={document.cookie.indexOf("loginAIScrutiny") == -1 ? "/login" : "/user"} element={document.cookie.indexOf("loginAIScrutiny") == -1 ? <Login /> : <User />} />
          <Route path={document.cookie.indexOf("loginAIScrutiny") == -1 ? "/signup" : "/user"} element={document.cookie.indexOf("loginAIScrutiny") == -1 ? <Signup /> : <User />} />
          <Route path='*' element={<Error />} />

        </Routes>

        {/* <div className='smallclass' id='smallclass'>
        <svg height="10" width="10">
          <circle cx="4" cy="4" r="3" stroke-width="0"></circle>
        </svg>
      </div>
      <div className='bigclass' id='bigclass'>
        <svg height="60" width="60" >
          <circle id="bigCircle" cx="30" cy="30" r="18" stroke-width="0.8"></circle>
        </svg>
      </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
