import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginAndSignup.css"
function Signup(){
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5001/api/auth/signup",
                { userName, password },
                { withCredentials: true }
            )
            navigate("/login");
        } catch (error) {
            console.log("Login failed: "+error);
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
                <button type="submit">Submit</button>
            </form>
            <p>Already have an account?<a href="/login">Login</a></p>
        </div>
    )    
} 
export default Signup;