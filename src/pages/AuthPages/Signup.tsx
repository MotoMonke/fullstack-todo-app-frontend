import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginAndSignup.css"
function Signup(){
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const apiUrl = import.meta.env.VITE_SIGNUP_URL;
            if (!apiUrl) {
                throw new Error("Missing REACT_APP_SIGNUP_URL environment variable");
            }
            const res = await axios.post(
                apiUrl,
                { userName, password },
                { withCredentials: true }
            )
            navigate("/login");
        } catch (error:any) {
            console.log("Login failed: "+error);
            console.log(error.response?.data.message);
            setErrorMessage(error.response?.data.message)
        }
    }
    return(
        <div className="form-page">
            <form onSubmit={handleSubmit} className="form">
                <h2>Signup</h2>
                <div className="username-input">
                    <label htmlFor="userName">Username:</label>
                    <input 
                        type="text" 
                        id="userName"
                        name="userName"  
                        value={userName} 
                        onChange={e=>setUserName(e.target.value)}
                    />
                </div>
                <div className="password-input">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
                {errorMessage.length>0&&<p className="error">{errorMessage}</p>}
                <button type="submit">Submit</button>
            </form>
            <p>Already have an account?<a href="/login">Login</a></p>
        </div>
    )    
} 
export default Signup;