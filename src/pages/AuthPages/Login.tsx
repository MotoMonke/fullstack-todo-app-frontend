import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginAndSignup.css";
function Login(){
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5001/api/auth/login",
                { userName, password },
                { withCredentials: true }
            )
            navigate("/");
        } catch (error:any) {
            console.log("Login failed: "+error);
            console.log(error.response?.data.message);
            setErrorMessage(error.response?.data.message)
        }
    }
    return(
        <div className="form-page">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
            <p>Don't have an account?<a href="/signup">Signup</a></p>
        </div>
    )    
} 
export default Login;