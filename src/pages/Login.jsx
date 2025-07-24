import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email) {
      setErrMessage("Email is empty");
      return;
    }
    if (!password) {
      setErrMessage("Password is empty");
      return;
    }
    setErrMessage("");
    const success = await login(email, password);

    if (!success) {
      setErrMessage("Wrong password or email");
      return;
    }
    navigate("/app");
  }

  return (
    <main className={styles.login}>
      <div className={styles.header}>
        <span className={styles.logo}>🌱</span>
        <h2>Welcome Back</h2>
        <p>Sign in to your gardening account</p>
      </div>
      <div className={styles.container}>
        <form className={styles.form}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="🔓 Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {errMessage && <p className={styles.errMessage}>{errMessage}</p>}

          <button className={styles.btnSignIn} onClick={(e) => handleLogin(e)}>
            Sign In
          </button>
        </form>
        <p className={styles.signUp}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
