import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/;

const Register = ({ showToast }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 8-20 characters and include an uppercase letter, lowercase letter, number, and special character.",
      );
      return;
    }

    setPasswordError("");
    setIsSubmitting(true);
    try {
      await axios.post("/auth/register", {
        name,
        email,
        password,
      });

      showToast("Registration successful. Please log in.");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message,
      );
      showToast("Unable to register this account.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-intro auth-intro-register">
        <span className="eyebrow">Join the conversation</span>
        <h1>Make room for better ideas.</h1>
        <p>Create an account and publish your perspective in minutes.</p>
      </div>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-heading">
          <span className="eyebrow">New here?</span>
          <h2>Create account</h2>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
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
          maxLength={20}
          minLength={8}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}"
          title="Use 8-20 characters with an uppercase letter, lowercase letter, number, and special character."
          aria-invalid={Boolean(passwordError)}
        />
        {passwordError && <p className="form-error">{passwordError}</p>}
        <button
          type="submit"
          className="button button-primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading-spinner" aria-hidden="true" />
          )}
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <p className="form-switch">
          Already have an account?{" "}
          <Link to="/login" className="text-link">
            Login here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
