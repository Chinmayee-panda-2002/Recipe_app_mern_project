
import React, { useState } from "react";


function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const addUser = { username, password };
  
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          body: JSON.stringify(addUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
        console.log("Registration Result:", result);
  
        if (!response.ok) {
          throw new Error("Registration failed");
        } else {
          alert("Registration Completed! Now login.");
        }
      } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
      }
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="login-username">Username:</label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
}

export default Register
