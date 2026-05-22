import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
function out(){
localStorage.removeItem("token");
navigate("/login")
}
    return(
        <div>
            <button onClick={out}>Logout</button>
        </div>
    )
}
export default Logout;