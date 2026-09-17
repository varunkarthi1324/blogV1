import React, { useEffect, useState } from "react";
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
import Toast from "./components/Toast";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );
  const [role, setRole] = useState(
    () => localStorage.getItem("role") || "user",
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("user");
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  return (
    <Router>
      <div className="app-shell">
        <header className="site-header">
          <Link to={isAuthenticated ? "/posts" : "/login"} className="brand">
            <span className="brand-mark">E</span>
            <span>echofluxx</span>
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
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span aria-hidden="true">{theme === "light" ? "Moon" : "Sun"}</span>
          </button>
        </header>

        <main className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/posts" : "/login"} replace />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setRole={setRole}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/register"
              element={<Register showToast={showToast} />}
            />
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
                  <CreatePost showToast={showToast} />
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
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/posts" : "/login"} replace />
              }
            />
          </Routes>
        </main>
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </div>
    </Router>
  );
}

export default App;
