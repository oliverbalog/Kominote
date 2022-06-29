import { useState } from "react";
import { CreateUser } from "../services/UserService";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Create = () => {
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
      password,
      email,
      mobileNumber: mobile,
    };

    setIsPending(true);

    const x = CreateUser(user);
    x.then((e) => {
      setIsPending(false);
      setResponse(e);
    });
  };

  return (
    <div>
      <div className="mycontent">
        <h2 className="regTitle">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="regForm">
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
                      type="text"
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
                      type="text"
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
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <div className="regBtn">
                  {!isPending && <button>Register</button>}
                  {isPending && <button disabled>Registering...</button>}
                </div>
              </Col>
            </Row>
          </div>
        </form>
      </div>
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
