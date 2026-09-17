import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}$/;

const Register = () => {
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

      alert("Registration successful. Please log in.");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message,
      );
      alert("Error registering user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          maxLength={20}
          minLength={8}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,20}"
          title="Use 8-20 characters with an uppercase letter, lowercase letter, number, and special character."
          aria-invalid={Boolean(passwordError)}
        />
        {passwordError && <p style={styles.error}>{passwordError}</p>}
        <button
          type="submit"
          style={styles.button}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading-spinner" aria-hidden="true" />
          )}
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p style={styles.switchText}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Login here
        </Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  switchText: {
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    maxWidth: "80%",
    margin: "0 0 10px",
  },
};

export default Register;
