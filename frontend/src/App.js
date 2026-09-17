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
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");

  // Check if the user is authenticated (e.g., token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set to true if token exists
    setRole(localStorage.getItem("role") || "user");
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("user");
  };

  return (
    <Router>
      <div className="app-shell">
        <header className="site-header">
          <Link to={isAuthenticated ? "/posts" : "/login"} className="brand">
            <span className="brand-mark">B</span>
            <span>Brightline</span>
          </Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link nav-link-accent">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/posts" className="nav-link">
                  Posts
                </Link>
                <Link to="/create-post" className="nav-link">
                  Create Post
                </Link>
                {role === "admin" && (
                  <Link to="/admin" className="nav-link nav-link-admin">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="button button-quiet">
                  Logout
                </button>
              </>
            )}
          </nav>
        </header>

        <main className="page-content">
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setRole={setRole}
                />
              }
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
            <Route
              path="/admin"
              element={
                isAuthenticated && role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate
                    to={isAuthenticated ? "/posts" : "/login"}
                    replace
                  />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
