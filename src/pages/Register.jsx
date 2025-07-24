import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState } from "react";
import { BASE_URL } from "../../config";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!name) {
      setErrMessage("Name is empty");
      return;
    }
    if (!email) {
      setErrMessage("Email is empty");
      return;
    }

    if (!password) {
      setErrMessage("Password is empty");
      return;
    }

    if (!confirmPassword) {
      setErrMessage("Confirm password");
      return;
    }
    if (password !== confirmPassword) {
      setErrMessage("Passwords are different");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    setErrMessage("");
    try {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        setErrMessage("Registration failed");
        const data = await res.json();
        throw new Error(data.detail || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setErrMessage(err.message);
    }
  }

  return (
    <div className={styles.register}>
      <main className={styles.container}>
        <div className={styles.header}>
          <span className={styles.logo}>🌱</span>
          <h2>Create Account</h2>
          <p>Join GardenTrack to manage your garden inventory</p>
        </div>
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="fullName">Name</label>
            <input
              id="fullName"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          {errMessage && <p className={styles.errMessage}>{errMessage}</p>}
          <button
            className={styles.btnCreate}
            onClick={(e) => handleCreateAccount(e)}
          >
            Create Account
          </button>
        </form>
        <p className={styles.signIn}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </main>
      <p className={styles.terms}>
        By creating an account, you agree to our terms and condition. Your data
        is protected and secure.
      </p>
    </div>
  );
}

export default Register;
