import { useContext, useEffect, useState } from "react";
import { CreateUser, LoginUser } from "../services/UserService";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { UserContext } from "../services/UserContext";
import { Navigate } from "react-router-dom";
import { NavigateButton } from "../components/NavigateButton/NavigateButton";
import { generateHashPassword } from "../services/GenerateHash";

const Create = () => {
  const { user, setUser } = useContext(UserContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName: firstname,
      lastName: lastname,
      username,
      password: (await generateHashPassword(password)).toString(),
      email,
      mobileNumber: mobile,
    };
    setIsPending(true);

    const x = CreateUser(user);
    x.then((resp_user) => {
      setResponse(resp_user);
      setIsPending(false);
      if (resp_user && !resp_user.error) {
        setIsPending(true);

        //login registrated user
        const z = LoginUser({
          username: user.username,
          password: user.password,
        });
        z.then((succ) => {
          setIsPending(false);
          if (succ.isSucceeded) {
            setUser({
              username: succ.username,
              image: succ.image,
              firstName: succ.firstName,
              lastName: succ.lastName,
            });
          }
        });
      }
    });
  };

  useEffect(() => {}, [response]);

  return (
    <div>
      <div>{user && <Navigate to="/dashboard" replace={true} />}</div>
      <div
        className={
          (window.localStorage.getItem("theme") === "dark" &&
            "mycontent content-dark") ||
          "mycontent"
        }
      >
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="reg-form">
            <Row>
              <Col sm={6}>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-center" sm={6}>
                    <label>First name:</label>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <input
                      type="text"
                      required
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-center" sm={6}>
                    <label>Last name:</label>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <input
                      type="text"
                      required
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-center" sm={6}>
                    <label>Username:</label>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-center" sm={6}>
                    <label>Password:</label>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-center" sm={6}>
                    <label>Email:</label>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-center" sm={12}>
                    <label>Mobile number:</label>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-5">
                <div>
                  {!isPending && <button>Register</button>}
                  {isPending && <button disabled>Registering...</button>}
                </div>
              </Col>
            </Row>
            <NavigateButton value="Rather log in" to="/login" />
          </div>
        </form>
      </div>
      {response.error && (
        <div className="danger-msg">
          <Row className="text-ceter mt-3 alert alert-danger danger-msg">
            <p className="text-center">{response.error}</p>
          </Row>
        </div>
      )}
      {response.username && (
        <div className="success-msg">
          <Row className="text-center mt-3 alert alert-success success-msg">
            <p className="text-center">
              Your account with username "{response.username}" is successfully
              created!
            </p>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Create;
