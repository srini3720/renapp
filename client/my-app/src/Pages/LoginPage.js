import React, { useState } from 'react';
import { Col, Button, Row, Container, Card } from "react-bootstrap";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) =>{
        // payload
        const payload = {
          email: email,
          password: password
        };
    
        // console.log("payload",payload)
    
        console.log('Login User user:', payload);
          const response =  axios.post('http://localhost:8095/login', payload).then((res)=>{
            if (res.data.message === "Login successful") {
              // console.log("res",res.data.message)
              let user = {
                email:email
              }
              localStorage.setItem('user', JSON.stringify(user));
              setEmail('');
              setPassword('');
              navigate('/profile');
            }
          })
  }
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div>
                  <h2>Login</h2>
                </div>

                <div className="p-3">

                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                       Email
                    </div>
                    <div>
                      <input class="form-control"  
                       id="email"
                       placeholder="Enter email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                      type="text" placeholder="Enter usename"  />
                    </div>
                  </div>
                
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      password
                    </div>
                    <div>
                      <input class="form-control"  
                       id="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                      type="password" placeholder="Enter password"  />
                    </div>
                  </div>
                  
                  <div className="d-grid">
                        <Button variant="primary" onClick={handleLogin}>
                          Login
                        </Button>
                      </div>
                  <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account ?{" "}
                        <a href="/signup" className="text-primary fw-bold">
                          Sign Up
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