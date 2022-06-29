import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { LoginUser } from "../services/UserService";
import { UserContext } from "../services/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    setIsPending(true);

    const x = LoginUser(user);
    x.then((e) => {
      setIsPending(false);
      setResponse(e);
      console.log(e);

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
    <div className="mycontent">
      <Row>
        <h2 className="regTitle">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="regForm">
            <Row>
              <Col>
                <Row>
                  <Col sm={4}>
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
              <Col>
                <Row>
                  <Col sm={4}>
                    <label>Password: </label>
                  </Col>
                  <Col>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                    ></input>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-5">
                {!isPending && <button>Log in</button>}
                {isPending && <button disabled>Logging in...</button>}
              </Col>
            </Row>
          </div>
        </form>
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
