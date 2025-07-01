import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5001/api/auth/login",
                { userName, password },
                { withCredentials: true }
            )
            navigate("/");
        } catch (error) {
            console.log("Login failed: "+error);
        }
    }
    return(
        
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Username:</label>
                <input 
                    type="text" 
                    id="userName"
                    name="userName"  
                    value={userName} 
                    onChange={e=>setUserName(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <p>Don't have an account?<a href="/signup">Signup</a></p>
        </>
        
    )    
} 
export default Login;