import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateAccount({ id }) {
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
  const [data, setData] = useState({});
  const nav = useNavigate();

  // Fetch initial data based on id
  const fetchApi = () => {
    fetch(baseURL + id)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  // Effect to fetch data when id changes
  useEffect(() => {
    if (id) {
      fetchApi();
    }
  }, [id]);

  // Function to handle form submission and update API
  const handleSave = () => {
    fetch(baseURL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        toast.success(`Update ${id} successful`, {
          onClose: () => {
            nav('/SWP391-MomAndBaby/admin/account');
          }
        });
      })
      .catch(error => {
        toast.error(`Update ${id} failed: ${error.message}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div
          style={{
            backgroundColor: "#ddede0",
            textAlign: "center",
            padding: "5px 20px",
          }}
        >
          <span style={{ fontSize: 35 }}>UPDATE ACCOUNT</span>
        </div>
        <div> 
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>ID</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.id || ""}
                readOnly
                disabled
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Full name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.fullname || ""}
                onChange={(e) => setData({ ...data, fullname: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Email address</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="email"
                value={data.email || ""}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Phone number</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.phone || ""}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.username || ""}
                readOnly
                disabled
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="password"
                value=""
                placeholder="Enter new password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Role</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Select
                aria-label="Default select example"
                value={data.role || ""}
                onChange={(e) => setData({ ...data, role: e.target.value })}
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </Form.Select>
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Avatar</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                value={data.avatar || ""}
                onChange={(e) => setData({ ...data, avatar: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-around" }}>
            <Col md={3}></Col>
            <Col md={9}>
              <Button
                style={{ marginLeft: 15, width: "60%", backgroundColor: "#337ab7", color: "white" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Col>
          </Row>
          <Row style={{ margin: 20 }}>
            <Link to={'/SWP391-MomAndBaby/admin/account'}>
              <Button style={{ width: "15%", color: "white" }} variant="info">
                &lt;&lt; Back to account
              </Button>
            </Link>
          </Row>
        </div>
      </div>
    </>
  );
}
