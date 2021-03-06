import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const navigate = useNavigate();
  const updateQuote = async (e) => {
    e.preventDefault();
    const req = await fetch("http://localhost:8080/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await req.json();
    console.log(data);
    if (data.status == "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.err);
    }
  };
  const populateQuote = async () => {
    const req = await fetch("http://localhost:8080/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);
    if (data.status == "ok") {
      setQuote(data.quote);
    } else {
      alert(data.err);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateQuote();
      }
    }
  }, []);
  return (
    <div>
      <h1>Welcome Dashboard</h1>
      <h4>your quote: {quote || "No Quote Found"} </h4>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Enter A quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update Quote" />
      </form>
    </div>
  );
}

export default Dashboard;
