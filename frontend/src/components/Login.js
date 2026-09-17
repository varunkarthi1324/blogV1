import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role || "user");
      setIsAuthenticated(true);
      setRole(data.role || "user");
      alert("Login successful");
      navigate("/posts");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-intro">
        <span className="eyebrow">Welcome back</span>
        <h1>Pick up where your ideas left off.</h1>
        <p>Sign in to share thoughtful posts with your community.</p>
      </div>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-heading">
          <span className="eyebrow">Your account</span>
          <h2>Log in</h2>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button
          type="submit"
          className="button button-primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading-spinner" aria-hidden="true" />
          )}
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p className="form-switch">
          Don't have an account?{" "}
          <Link to="/register" className="text-link">
            Register here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
