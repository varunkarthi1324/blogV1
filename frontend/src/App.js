import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (e.g., token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div style={styles.container}>
        {/* Navigation Bar */}
        <nav style={styles.nav}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" style={styles.navLink}>
                Login
              </Link>
              <Link to="/register" style={styles.navLink}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/posts" style={styles.navLink}>
                Posts
              </Link>
              <Link to="/create-post" style={styles.navLink}>
                Create Post
              </Link>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Routes */}
        <div style={styles.content}>
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/posts"
              element={
                isAuthenticated ? (
                  <PostList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/create-post"
              element={
                isAuthenticated ? (
                  <CreatePost />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Centralized styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 15px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  content: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default App;
