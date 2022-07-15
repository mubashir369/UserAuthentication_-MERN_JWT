import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
function Register() {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
      e.preventDefault()
    const response=await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
          name,email,password
      })
    });
    const data= response.json()
    if(data.status==='Ok'){
      navigate('/login')
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
