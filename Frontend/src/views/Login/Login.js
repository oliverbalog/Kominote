import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { LoginUser } from "../../services/UserService";
import { UserContext } from "../../services/UserContext";
import { Link, Navigate } from "react-router-dom";
import "./Login.scss";
import { NavigateButton } from "../../components/NavigateButton/NavigateButton";
import { generateHashPassword } from "../../services/GenerateHash";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const temp_user = {
      username,
      password: (await generateHashPassword(password)).toString(),
    };

    setIsPending(true);

    const x = LoginUser(temp_user);
    x.then((e) => {
      setIsPending(false);
      setResponse(e);

      if (e.isSucceeded) {
        setUser({
          username: e.username,
          image: e.image,
          firstName: e.firstName,
          lastName: e.lastName,
        });
      }
    });
  };

  return (
    <div
      className={
        (window.localStorage.getItem("theme") === "dark" &&
          "mycontent content-dark") ||
        "mycontent"
      }
    >
      <div>{user && <Navigate to="/dashboard" replace={true} />}</div>
      <Row>
        <h2>Login</h2>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="reg-form">
              <Col sm={12}>
                <Row>
                  <Col>
                    <label>Username: </label>
                  </Col>
                  <Col>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                    ></input>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} className="mt-4">
                <Row>
                  <Col>
                    <label>Password: </label>
                  </Col>
                  <Col>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    ></input>
                  </Col>
                </Row>
              </Col>
              <Row>
                <Col className="text-center mt-5">
                  {!isPending && <button>Log in</button>}
                  {isPending && <button disabled>Logging in...</button>}
                </Col>
              </Row>
              <NavigateButton
                value="Or register a new account"
                to="/registration"
              />
            </div>
          </form>
        </div>
      </Row>
      <div>
        {response.isSucceeded && response.isSucceeded === "false" && (
          <Row className="text-center mt-3 alert alert-danger card success-msg">
            <div>Sorry, We coudn't log you in!</div>
          </Row>
        )}
      </div>
      <div>
        {response.isSucceeded && response.isSucceeded === "true" && (
          <Row className="text-center mt-3 alert alert-success card success-msg">
            <div>Successfully logged in!</div>
          </Row>
        )}
      </div>
      <div>
        {response.error && (
          <Row className="text-center mt-3 alert alert-danger card success-msg">
            <div>Oops, an error happened!</div>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Login;
