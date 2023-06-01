import React, { useState } from 'react';
import { Col, Button, Row, Container, Card } from "react-bootstrap";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    

    if (password !== confirmPassword) {
      alert('Password and Confirm Password must match');
      return;
    }

    // payload
    const payload = {
      username: username,
      email: email,
      password: password
    };

    // console.log("payload",payload)

      const response =  axios.post('http://localhost:8095/signup', payload).then((res)=>{
        if (res.data.message === "Signup successful") {
          // console.log("res",res.data.message)
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/login');
        }
      })
  };


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div>
                  <h2>Sign Up</h2>
                </div>

                <div className="p-3">

                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Username
                    </div>
                    <div>
                      <input class="form-control"  type="text" placeholder="Enter usename"                
                      id="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Email
                    </div>
                    <div>
                      <input class="form-control"  type="email" placeholder="Enter email"  
                       id="email"
                       placeholder="Enter email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      password
                    </div>
                    <div>
                      <input class="form-control"  type="password" placeholder="Enter password"  

                       id="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Repeat password
                    </div>
                    <div>
                      <input class="form-control"  type="passsword" placeholder="Enter password" 
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="d-grid">
                        <Button variant="primary" onClick={handleRegister}>
                          Register
                        </Button>
                      </div>
                  <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an Account ?{" "}
                        <a href="/Login" className="text-primary fw-bold">
                          Log In
                        </a>
                      </p>
                    </div>
                </div>


              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}