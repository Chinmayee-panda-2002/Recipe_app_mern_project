import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies(["access_token"]);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const addUser = { username, password };
        
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                body: JSON.stringify(addUser),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const result = await response.json();
            console.log("Login Result:", result);
            
            if (!response.ok) {
                // Don't try to parse errorData again - we already have the response body in 'result'
                throw new Error(result.message || "Login failed");
            }
            
            const { token, userId } = result;
            
            if (token && userId) {
                // Remove the path restriction to allow the token to be available across all routes
                setCookies("access_token", token);
                window.localStorage.setItem("userID", userId);
                navigate("/home"); // Changed from "/" to "/home" for proper redirection
                alert("Login successful");
            } else {
                alert("Login failed. Please check your credentials.");
            }
            
        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
        }
    };
    
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="register-username">Username:</label>
                    <input
                        type="text"
                        id="register-username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password:</label>
                    <input
                        type="password"
                        id="register-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;