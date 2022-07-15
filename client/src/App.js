import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <h1>Client </h1>
        <Link to={'/login'} >Login</Link> <br />
          <Link to={'register'} >Register</Link>  
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
