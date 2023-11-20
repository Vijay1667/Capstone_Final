import React from "react";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
export default function Error() {
    return (
        <div>
            <Navbar />
            <div className="error_page container-fluid d-flex flex-column align-items-center justify-content-center">
                <div style={{ color: "#FF6600" }}>&#9888; </div> <div className="text-center">404 Error. Nothing to see here.</div> <div className="text-center">  <Link to="/login"> Log In</Link> and try again </div>
            </div>
        </div>
    )
}