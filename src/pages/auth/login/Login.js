import React, { Fragment, useEffect, useState, useContext } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
// import { clearErrors, login } from "../../../actions/userActions";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import styles from "./Login.module.scss";
import axios from "axios";
import { baseUrl } from "../../../config";
import { UserContext } from "../../../context/UserContext";

const Login = ({ history, location }) => {
  const { setUser, setToken, setAuthenticated } = useContext(UserContext);
  const { token, user, isAuthenticated } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();

  const error = false;
  const loading = false;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      console.log(error);
    }
  }, []);

  const login = async () => {
    try {
      // const token = 'your-bearer-token';
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      // Handle the response
      const data = response.data;

      console.log(response.data);
      setUser(data.user);
      setToken(data.token);
      setAuthenticated(true);
      if (response.data.success == true) {
        history.push(redirect);
      }
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <MetaData title={"Login"} />
      <Navbar />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <h3 className="text-center text-white mb-3">Login</h3>
          <form onSubmit={submitHandler}>
            <div className={styles.from_group}>
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                placeholder="Enter your email ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.from_group}>
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                placeholder="Enter your password ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.from_group}>
              <button
                type="submit"
                onClick={() => {
                  login();
                }}
              >
                {loading ? <ButtonLoader /> : "Login"}
              </button>
            </div>
          </form>
          <div className={styles.from_group}>
            <p className="text-center text-white">
              Dont Have Account ? <Link to="/register">Signup</Link>
            </p>
            <p className="text-center ">
              <Link to="/password/forgot">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
