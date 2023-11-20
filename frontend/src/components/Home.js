import React, { useEffect } from "react";
import Navbar from "./NavBar";

import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap-trial/MorphSVGPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Typewriter from 'typewriter-effect/dist/core';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "aos"
import SplitText from "gsap-trial/SplitText";
import Footer from "./footer";
import Aos from "aos";
import "aos"
import { AosOptions } from "aos";
export default function Home() {
    const particlesInit = async (main) => {
        console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, MotionPathPlugin);
    gsap.registerPlugin(MorphSVGPlugin)
    gsap.registerPlugin(TextPlugin);
    Aos.init();
    
    
    useEffect(() => {
        // let tl2 = gsap.timeline({ repeat: -1, delay: 0, repeatDelay: 0, yoyo: true });
        let tl = gsap.timeline({ repeat: -1, ease: "power4.easeOut", repeatDelay: 2 });
        var typeSplit = new SplitText('.content ', {
            type: 'words',
            tagName: 'span'
        })


        const words = typeSplit.words
        words.forEach((word) => {
            word.classList.add("word-hover")
        })
        gsap.set(".content", { perspective: 500 });
        gsap.from(typeSplit.words, {
            y: 90,
            opacity: 0,
            duration: 0.6,
            ease: 'sine.in',
            stagger: 0.1,
            autoAlpha: 0,
        })

        tl.fromTo(".house", { drawSVG: 0 }, { delay: 1, duration: 3, drawSVG: "100%", yoyo: true })
            .to(".house", 1, { duration: 3, morphSVG: ".second_morph", delay: 2 })
            .to(".house", 1, { duration: 3, morphSVG: ".third_morph", delay: 2 })
        // tl2.fromTo(".bg_1_path", { drawSVG: 0 }, { duration: 3, drawSVG: "100%", yoyo: true })
        // Animate from the initial state to the end state

        // var typeSplit2 = new SplitText('.content-2', {
        //     type: 'words',
        //     tagName: 'span'
        // })
        // let tl2=gsap.timeline({repeat: -1,  repeatDelay: 1})
        // gsap.set(".content-2", { perspective: 500 });
        // tl2.from(typeSplit2.words, {

        //     rotateX: -100,
        //     opacity: 0,
        //     duration: 1.5,
        //     ease: 'bounce',
        //     stagger: 0.2,
        //     autoAlpha: 0,
        // })
        var typewriter = new Typewriter(document.getElementById("content-2"), {
            loop: true,
            delay: 90,
            cursor: ' '
        });
        typewriter.typeString('Tired of <span style="color:rgb(255, 102, 0)">Evaluating</span> manually?').pauseFor(500).deleteChars(30).typeString('We\'ll do the <span style="color:rgb(255, 102, 0)"> hard work</span> for you').pauseFor(1000).start()
        // helper function that busts apart a single <path> that has multiple segments into a <path> for each segment (indicated by an "M" command);


    }, [])
    return (
        <div>
            {/* <div className=" "> */}
            {/* <svg className="bg-1 p-2" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 184 206" fill="none">
                <path className="bg_1_path" id="bg_1_path_1" d="M180.778 103C180.778 169.667 170.901 203 91.8889 203C12.8765 203 3 169.667 3 103C3 36.3333 14.1111 3 91.8889 3C169.667 3 180.778 36.3333 180.778 103Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <path className="bg_1_path" id="bg_1_path_2" d="M58.5558 14.1111C58.5558 14.1111 65.2732 40.727 53.0002 53C40.7272 65.273 14.1113 58.5555 14.1113 58.5555" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <path className="bg_1_path" id="bg_1_path_3" d="M47.4443 147.444H91.8888" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                <path className="bg_1_path" id="bg_1_path_4" d="M47.4443 114.111H136.333" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
            </svg> */}

            {/* <svg  viewBox="0 0 397 508" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  xmlns="http://www.w3.org/2000/svg" d="M115.111 305C180.199 305 216.69 305 281.778 305M115.111 409.111C180.199 409.111 216.69 409.111 281.778 409.111M115.111 201H281.778M337.333 504H59.5556C28.8731 504 4 479.127 4 448.444V59.5555C4 28.8731 28.8731 4 59.5556 4H214.716C222.083 4 229.149 6.92658 234.358 12.1359L384.753 162.531C389.962 167.74 392.889 174.805 392.889 182.173V448.444C392.889 479.127 368.016 504 337.333 504Z" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
                <path  xmlns="http://www.w3.org/2000/svg" d="M353.078 200.578C357.959 195.696 365.874 195.696 370.755 200.578C375.637 205.459 375.637 213.374 370.755 218.256L365.8 223.211L348.122 205.533L353.078 200.578Z M339.283 214.372L286.917 266.739V284.417H304.594L356.961 232.05L339.283 214.372Z" stroke="#FF6600" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </svg> */}
            {/* </div> */}
            <Navbar />

            <div className="home_page container-fluid p-4" >

                <div className="text-center content " >
                    <span className="others"> Get Your Answer Sheet Evaluated by</span> <span className="zoomin">AI</span>

                </div>
                <div className="row p-2">
                    <div className="col-md-4 text-center">
                        <div>
                            <svg className="animm p-2" viewBox="0 0 397 508" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="house" id="house" xmlns="http://www.w3.org/2000/svg" d="M115.111 305C180.199 305 216.69 305 281.778 305M115.111 409.111C180.199 409.111 216.69 409.111 281.778 409.111M115.111 201H281.778M337.333 504H59.5556C28.8731 504 4 479.127 4 448.444V59.5555C4 28.8731 28.8731 4 59.5556 4H214.716C222.083 4 229.149 6.92658 234.358 12.1359L384.753 162.531C389.962 167.74 392.889 174.805 392.889 182.173V448.444C392.889 479.127 368.016 504 337.333 504Z" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
                                <path className="house" id="house2" xmlns="http://www.w3.org/2000/svg" d="M353.078 200.578C357.959 195.696 365.874 195.696 370.755 200.578C375.637 205.459 375.637 213.374 370.755 218.256L365.8 223.211L348.122 205.533L353.078 200.578Z M339.283 214.372L286.917 266.739V284.417H304.594L356.961 232.05L339.283 214.372Z" stroke="black" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                                {/* <path className="house" id="house3" xmlns="http://www.w3.org/2000/svg" d="" stroke="#FF6600" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" /> */}

                                {/* <path style={{ visibility: "hidden" }} className="second_morph" id="second_morph" xmlns="http://www.w3.org/2000/svg" d="M191.5 392.889L170.667 476.222L142.889 504H365.111L337.333 476.222L316.5 392.889M4 281.778H504M59.5556 392.889H448.444C479.127 392.889 504 368.016 504 337.333V59.5556C504 28.8731 479.127 4 448.444 4H59.5556C28.8731 4 4 28.8731 4 59.5556V337.333C4 368.016 28.8731 392.889 59.5556 392.889Z" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /> */}
                                <path style={{ visibility: "hidden" }} className="second_morph" id="second_morph" xmlns="http://www.w3.org/2000/svg" d="M172.75 354L154 429L129 454H329L304 429L285.25 354M4 254H454M54 354H404C431.614 354 454 331.614 454 304V54C454 26.3858 431.614 4 404 4H54C26.3858 4 4 26.3858 4 54V304C4 331.614 26.3858 354 54 354Z" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
                                {/* <path style={{ visibility: "hidden" }} className="third_morph" id="third_one_1" d="" fill="white" fill-opacity="0.2" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /> */}

                                {/* <path style={{ visibility: "hidden" }} classname="third_morph" id="third_one_2" xmlns="http://www.w3.org/2000/svg" d="M 200.09 264.858 L 204.333 269.1 L 208.576 264.858 L 301.31 172.123 C 301.312 172.121 301.315 172.118 301.317 172.116 C 303.471 169.979 306.382 168.779 309.417 168.779 C 312.455 168.779 315.37 169.981 317.524 172.123 L 317.529 172.128 C 318.607 173.197 319.462 174.469 320.046 175.87 C 320.63 177.271 320.93 178.774 320.93 180.292 C 320.93 181.81 320.63 183.314 320.046 184.715 C 319.462 186.116 318.607 187.388 317.529 188.457 L 317.52 188.466 L 317.512 188.474 L 212.532 293.454 C 212.53 293.456 212.528 293.459 212.525 293.461 C 211.452 294.523 210.18 295.364 208.782 295.935 C 207.381 296.507 205.881 296.798 204.368 296.789 L 204.358 296.789 C 201.345 296.776 198.457 295.581 196.316 293.461 C 196.313 293.459 196.311 293.456 196.309 293.454 L 146.802 243.948 L 146.639 243.784 L 146.463 243.633 C 145.259 242.602 144.281 241.334 143.591 239.907 C 142.901 238.48 142.513 236.926 142.452 235.343 C 142.39 233.759 142.657 232.18 143.235 230.704 C 143.814 229.228 144.69 227.888 145.811 226.767 C 146.932 225.647 148.272 224.77 149.748 224.192 C 151.223 223.613 152.803 223.347 154.386 223.408 C 155.97 223.469 157.524 223.857 158.951 224.547 L 158.951 224.547 C 160.377 225.237 161.646 226.215 162.677 227.419 L 162.828 227.595 L 162.991 227.759 L 200.09 264.858 Z M 92.999 482.779 L 370.776 482.779 C 401.459 482.779 426.332 457.906 426.332 427.223 L 426.332 160.952 C 426.332 153.584 423.405 146.519 418.196 141.31 L 267.801 -9.085 C 262.592 -14.294 255.526 -17.221 248.159 -17.221 L 92.999 -17.221 C 62.316 -17.221 37.443 7.652 37.443 38.335 L 37.443 427.223 C 37.443 457.906 62.316 482.779 92.999 482.779 Z" stroke="#24FF00" stroke-width="12"/> */}

                                {/* <path style={{ visibility: "hidden" }} className="third_morph" id="third_one_2" xmlns="http://www.w3.org/2000/svg" d="M166.647 286.079L170.89 290.321L175.133 286.079L267.867 193.344C267.869 193.342 267.872 193.339 267.874 193.337C270.028 191.2 272.939 190 275.974 190C279.012 190 281.927 191.202 284.081 193.344L284.086 193.349C285.164 194.418 286.019 195.69 286.603 197.091C287.187 198.492 287.487 199.995 287.487 201.513C287.487 203.031 287.187 204.535 286.603 205.936C286.019 207.337 285.164 208.609 284.086 209.678L284.077 209.687L284.069 209.695L179.089 314.675C179.087 314.677 179.085 314.68 179.082 314.682C178.009 315.744 176.737 316.585 175.339 317.156C173.938 317.728 172.438 318.019 170.925 318.01L170.915 318.01C167.902 317.997 165.014 316.802 162.873 314.682C162.87 314.68 162.868 314.677 162.866 314.675L113.359 265.169L113.196 265.005L113.02 264.854C111.816 263.823 110.838 262.555 110.148 261.128C109.458 259.701 109.07 258.147 109.009 256.564C108.947 254.98 109.214 253.401 109.792 251.925C110.371 250.449 111.247 249.109 112.368 247.988C113.489 246.868 114.829 245.991 116.305 245.413C117.78 244.834 119.36 244.568 120.943 244.629C122.527 244.69 124.081 245.078 125.508 245.768L128.121 240.367L125.508 245.768C126.934 246.458 128.203 247.436 129.234 248.64L129.385 248.816L129.548 248.98L166.647 286.079Z M59.5556 504H337.333C368.016 504 392.889 479.127 392.889 448.444V182.173C392.889 174.805 389.962 167.74 384.753 162.531L234.358 12.1359C229.149 6.92658 222.083 4 214.716 4H59.5556C28.8731 4 4 28.8731 4 59.5555V448.444C4 479.127 28.8731 504 59.5556 504Z" stroke="#24FF00" stroke-width="12" /> */}
                                <path style={{ visibility: "hidden" }} className="third_morph" id="third_one_2" xmlns="http://www.w3.org/2000/svg" d="M166.647 286.079L170.89 290.321L175.133 286.079L267.867 193.344C267.869 193.342 267.872 193.339 267.874 193.337C270.028 191.2 272.939 190 275.974 190C279.012 190 281.927 191.202 284.081 193.344L284.086 193.349C285.164 194.418 286.019 195.69 286.603 197.091C287.187 198.492 287.487 199.995 287.487 201.513C287.487 203.031 287.187 204.535 286.603 205.936C286.019 207.337 285.164 208.609 284.086 209.678L284.077 209.687L284.069 209.695L179.089 314.675C179.087 314.677 179.085 314.68 179.082 314.682C178.009 315.744 176.737 316.585 175.339 317.156C173.938 317.728 172.438 318.019 170.925 318.01L170.915 318.01C167.902 317.997 165.014 316.802 162.873 314.682C162.87 314.68 162.868 314.677 162.866 314.675L113.359 265.169L113.196 265.005L113.02 264.854C111.816 263.823 110.838 262.555 110.148 261.128C109.458 259.701 109.07 258.147 109.009 256.564C108.947 254.98 109.214 253.401 109.792 251.925C110.371 250.449 111.247 249.109 112.368 247.988C113.489 246.868 114.829 245.991 116.305 245.413C117.78 244.834 119.36 244.568 120.943 244.629C122.527 244.69 124.081 245.078 125.508 245.768L128.121 240.367L125.508 245.768C126.934 246.458 128.203 247.436 129.234 248.64L129.385 248.816L129.548 248.98L166.647 286.079Z M59.5556 504H337.333C368.016 504 392.889 479.127 392.889 448.444V182.173C392.889 174.805 389.962 167.74 384.753 162.531L234.358 12.1359C229.149 6.92658 222.083 4 214.716 4H59.5556C28.8731 4 4 28.8731 4 59.5555V448.444C4 479.127 28.8731 504 59.5556 504Z" stroke="#24FF00" stroke-width="12" />


                            </svg>
                        </div>
                        {/* <svg style={{visibility:"hidden"}}  width="397" height="508" viewBox="0 0 397 508" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                        {/* <path d="M59.5556 504H337.333C368.016 504 392.889 479.127 392.889 448.444V182.173C392.889 174.805 389.962 167.74 384.753 162.531L234.358 12.1359C229.149 6.92658 222.083 4 214.716 4H59.5556C28.8731 4 4 28.8731 4 59.5555V448.444C4 479.127 28.8731 504 59.5556 504Z" fill="white" fill-opacity="0.2" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /> */}

                        {/* </svg> */}

                    </div>
                    <div className="col-md-8 text-center  d-flex flex-column align-items-center justify-content-center">
                        <div className="content-2 p-4 " id="content-2">

                        </div>

                        <div className="p-3 w-100">
                            <button className="rounded-pill custom_button " >Click here to get started <span >&#8250;</span></button>
                        </div>
                    </div>



                </div>
                <div className="container p-5">
                    <div className="row py-3" >
                        <div className="col-md-3 col-5 py-5 info_cards text-center rounded "  data-aos="fade-up-right" data-aos-duration="1500">
                        &#9312; Student Uploads Answer Scripts
                        </div>
                        <div className="col-md-1 col-2 py-5" style={{paddingLeft:0,paddingRight:0}} data-aos="fade-up-right" data-aos-duration="1500">
                            <hr className="" style={{margin:0,width:"100%",border:"2px solid black"}}/>
                        </div>
                        <div className="col-md-3 col-5 py-5 info_cards text-center rounded" data-aos="fade-up-right" data-aos-duration="1500">
                        &#9312; Professor Uploads Answer Scripts
                        </div>
                        <div className="col-md-5 col-0">
                        </div>
                    </div>
                    <div>
                        <div className="row py-3">
                            <div className="col-md-8">
                            </div>
                            <div id="step-2" className="col-md-4 py-5 info_cards text-center rounded" data-aos="fade-up-left" data-aos-duration="1500">
                            &#9313;  Extraction of text using OCR
                            </div>


                        </div>
                    </div>
                    <div>
                        <div className="row py-3">
                            <div className="col-md-4 py-5 info_cards text-center rounded" data-aos="fade-up-right" data-aos-duration="1500">
                            &#9314;  Training of the model
                            </div>
                            <div className="col-md-8">

                            </div>


                        </div>
                    </div>
                    <div>
                        <div className="row py-3">
                            <div className="col-md-8">
                                
                            </div>
                            <div className="col-md-4 py-5 info_cards text-center rounded" data-aos="fade-up-left" data-aos-duration="1500">
                            &#9315;  Return the semantic score

                            </div>


                        </div>
                    </div>

                </div>

            </div>

            <Footer />

            <Particles
                id="tsparticles"
                init={particlesInit}

                options={{
                    name: "Link Triangles",
                    particles: {
                        number: {
                            value: 90,
                            density: {
                                enable: true,
                            },
                        },
                        color: {
                            value: "#FF6600",

                        },
                        shape: {
                            type: "circle",

                        },
                        opacity: {
                            value: 0.4,
                        },
                        size: {
                            value: {
                                min: 1,
                                max: 4,
                            },
                        },
                        links: {
                            enable: true,
                            distance: 150,
                            color: "#000000",
                            opacity: 0.3,
                            width: 1,
                            triangles: {
                                enable: true,
                                color: "#ff6611",
                                opacity: 0.05,
                            },
                        },
                        move: {
                            enable: true,
                            speed: 4,
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                        },
                        modes: {
                            grab: {
                                distance: 400,
                                links: {
                                    opacity: 0.2,
                                },
                            },
                            bubble: {
                                distance: 400,
                                size: 40,
                                duration: 2,
                                opacity: 0.2,
                            },
                            repulse: {
                                distance: 200,
                            },
                            push: {
                                quantity: 4,
                            },
                            remove: {
                                quantity: 2,
                            },
                        },
                    },
                    background: {
                        color: "transparent",
                    },
                }}
            />

        </div>
    )
}