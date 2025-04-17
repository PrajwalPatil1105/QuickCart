import React, { useEffect, useState } from "react";
import styles from "../Styles/Login.module.css";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  const [SerMsg, setSerMsg] = useState();

  useEffect(() => {
    toast("Here is a Demo of Login Page of User");
  }, []);

  const handleLoginSuccess = () => {
    const redirectPath = localStorage.getItem("postLoginRedirect");
    if (redirectPath) {
      localStorage.removeItem("postLoginRedirect");
      navigate(redirectPath);
    } else {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  async function handlesubmit(e) {
    e.preventDefault();
    if (email.length === 0) {
      setemailErr("* Please Enter Email");
    } else if (!email.includes("@")) {
      setemailErr("* Enter Valid Email");
    } else {
      setemailErr("");
    }
    password.length === 0
      ? setpasswordErr("* Please Enter Password")
      : setpasswordErr("");

    if (email.length > 2 && password.length >= 1) {
      const storedUserInfo = localStorage.getItem("userinfo");
      if (!storedUserInfo) {
        toast.error("No account found. Please sign up first.");
        return;
      }
      const { email: storedEmail, password: storedPassword } =
        JSON.parse(storedUserInfo);
      if (email === storedEmail && password === storedPassword) {
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard
        }, 2000);
      } else {
        toast.error("Invalid email or password");
      }
    }
  }

  useEffect(() => {
    if (SerMsg?.statuscode === "1") {
      toast.success(SerMsg?.message);
      handleLoginSuccess();
    } else if (SerMsg?.statuscode === "0") {
      toast.error(SerMsg?.message);
    }
  }, [SerMsg]);

  return (
    <div className={styles.container}>
      <div className="absolute top-2 left-4 m-4">
        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          QuickCart
        </span>
        <span className="block text-xs text-gray-600 dark:text-gray-400">
          Happy shopping, Happy Life
        </span>
      </div>

      <div className={styles.loginForm}>
        <form className={styles.form} onSubmit={handlesubmit}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <div className={styles.emaildiv}>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              className={styles.emailinput}
            />
            <p className={styles.emailerr}>{emailErr}</p>
          </div>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passworddiv}>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter Password"
              className={styles.passwordinput}
            />
            <p className={styles.passworderr}>{passwordErr}</p>
          </div>
          <button className={styles.primaryButton}>Log In</button>
          <p className={styles.or}>OR</p>
          <p className={styles.googleButton}>
            <img
              src="./Images/googleicon.png"
              alt="Google Icon"
              className={styles.googleIcon}
            />
            Sign In with Google
          </p>
        </form>
        <p className={styles.register}>
          Don’t have an account?{" "}
          <a onClick={() => navigate("/")}>Register now</a>
        </p>
      </div>
      <img src="./Images/logindesign.png" className={styles.leftDesign} />
      <img src="./Images/EllipseB.png" className={styles.rightDesign} />
      <img src="./Images/EllipseA.png" className={styles.bottomDesign} />
    </div>
  );
}

export default Login;
