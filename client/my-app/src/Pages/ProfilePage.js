import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [isEditable,setIseditable] = useState(false)

  
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("parse user",parsedUser)
      setUser(parsedUser);
    }
  }, []);

  const handleSave = (e) =>{
    // payload
    const payload = {
      email: user.email,
      contact: contact,
      dob:dob,
      username:username,
      age:parseInt(age)
    };

    console.log('Login User user:', payload);
      const response =  axios.post('http://localhost:8095/updateUser', payload).then((res)=>{
        
      console.log("user",res)
      if (res.data !== null) {
        let userData = res.data
          console.log("res",userData)
          let user = {
            email: userData.email,
            contact: userData.contact,
            dob:userData.dob,
            username:userData.username,
            age:userData.age
          }
          localStorage.setItem('user', JSON.stringify(user));
          setIseditable(false)
        }
      })
}


const onLogOut = (e) => {
  localStorage.clear()
  navigate("/login")
}


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>

                  <h2>Profile</h2>
                  </div>
                  <div className="ml-3 mb-3">
                        <Button variant="secondary" onClick={(e) => setIseditable(!isEditable)} >
                         Edit
                        </Button>
                    </div>
                </div>

                <div className="p-3">

                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Username
                    </div>
                    <div>
                      <input onChange={(e) => setUsername(e.target.value)} disabled={!isEditable ? true : false} class="form-control"  type="text" placeholder="Enter usename"  />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Email
                    </div>
                    <div>
                      <input  onChange={(e) => setEmail(e.target.value)} disabled={!isEditable ? true : false} class="form-control" disabled={user && user.email ? true : false} value={user && user.email ? user.email : ""}  type="email" placeholder="Enter email"  />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Contact
                    </div>
                    <div>
                      <input  onChange={(e) => setContact(e.target.value)} disabled={!isEditable ? true : false} class="form-control"  type="text" placeholder="Enter Contact"  />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      Age
                    </div>
                    <div>
                      <input  onChange={(e) => setAge(e.target.value)} disabled={!isEditable ? true : false} class="form-control"  type="number" placeholder="Enter Contact"  />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div class="col-sm-4 text-start">
                      DOB
                    </div>
                    <div>
                      <input  onChange={(e) => setDob(e.target.value)}   disabled={!isEditable ? true : false} class="form-control"  type="passsword" placeholder="Enter DOB"  />
                    </div>
                  </div>
                  <div className="d-grid mb-3">
                        <Button variant="primary" onClick={handleSave}>
                         Save
                        </Button>
                    </div>
                  <div className="d-grid">
                        <Button variant="primary" onClick={onLogOut}>
                         Log Out
                        </Button>
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