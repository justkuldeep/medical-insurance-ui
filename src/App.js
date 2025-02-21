import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [aparId, setAparId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (aparId.trim() === "") {
      setError("APAR ID is required");
    } else {
      setError("");
      navigate("/interface-selection");
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2>Login with APAR ID</h2>
        <input 
          type="text" 
          placeholder="Enter APAR ID" 
          className="input-field" 
          value={aparId} 
          onChange={(e) => setAparId(e.target.value)} 
        />
        {error && <p className="error-message">{error}</p>}
        <button className="button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

const InterfaceSelection = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Select Interface</h1>
      <button className="button" onClick={() => navigate("/user-dashboard")}>
        User Interface
      </button>
      <button className="button" onClick={() => navigate("/hospital-dashboard")}>
        Hospital Interface
      </button>
      <button className="button" onClick={() => navigate("/insurance-dashboard")}>
        Insurance Interface
      </button>
    </div>
  );
};

const Dashboard = ({ role }) => {
  return (
    <div className="container">
      <h1>{role} Dashboard</h1>
      <p>View your insurance details and medical records here.</p>
      <Link to="/claims">
        <button className="button">View Claims</button>
      </Link>
      <Link to="/claim">
        <button className="button">Submit a Claim</button>
      </Link>
    </div>
  );
};

const ClaimSubmission = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (file && description) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      <h1>Submit a Claim</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
      <textarea placeholder="Enter claim details..." value={description} onChange={(e) => setDescription(e.target.value)} className="input-field"></textarea>
      <button className="button" onClick={handleSubmit} disabled={!file || !description}>
        Submit
      </button>
      {submitted && <p className="success-message">Claim in process, you will be updated within 24 hours.</p>}
    </div>
  );
};

const ClaimsList = () => {
  const claims = [
    { id: 1, status: "Approved", date: "2025-02-20" },
    { id: 2, status: "Pending", date: "2025-02-18" },
  ];
  return (
    <div className="container">
      <h1>My Claims</h1>
      <ul>
        {claims.map((claim) => (
          <li key={claim.id} className="claim-item">
            Claim #{claim.id} - Status: {claim.status} - Date: {claim.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/interface-selection" element={<InterfaceSelection />} />
        <Route path="/user-dashboard" element={<Dashboard role="User" />} />
        <Route path="/hospital-dashboard" element={<Dashboard role="Hospital" />} />
        <Route path="/insurance-dashboard" element={<Dashboard role="Insurance" />} />
        <Route path="/claim" element={<ClaimSubmission />} />
        <Route path="/claims" element={<ClaimsList />} />
      </Routes>
    </Router>
  );
};

export default App;
