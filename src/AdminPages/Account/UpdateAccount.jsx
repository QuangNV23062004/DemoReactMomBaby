import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UpdateAccount() {
  const { id } = useParams(); // Get the ID from the URL
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
  const [initialValues, setInitialValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: '',
    avatar: '',
  });
  const [originalPassword, setOriginalPassword] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(baseURL + id)
        .then((response) => response.json())
        .then((data) => {
          setInitialValues({
            fullname: data.fullname || '',
            email: data.email || '',
            phone: data.phone || '',
            username: data.username || '',
            password: '',
            role: data.role || '',
            avatar: data.avatar || '',
          });
          setOriginalPassword(data.password || '');
        })
        .catch((error) => {
          console.log("Fetch error:", error);
        });
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'Fullname must be at least 5 characters')
        .required('Fullname is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters'),
      role: Yup.string()
        .required('Role is required'),
      avatar: Yup.string()
        .required('Avatar URL is required'),
    }),
    onSubmit: (values) => {
      const updatedValues = { ...values };

      if (!values.password) {
        updatedValues.password = originalPassword;
      }

      fetch(baseURL + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
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
    },
  });

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
        <Form onSubmit={formik.handleSubmit}>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>ID</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                value={id}
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
              <Form.Control style={{width: "60%"}}
                type="text"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="error">{formik.errors.fullname}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Email address</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Phone number</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error">{formik.errors.phone}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Username</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                value={formik.values.username}
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
              <Form.Control style={{width: "60%"}}
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Role</Form.Label>
            </Col>
            <Col md={9} style={{paddingLeft: 75}}>
              <Form.Select style={{width:  "64%"}}
                aria-label="Default select example"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
              {formik.touched.role && formik.errors.role ? (
                <div className="error">{formik.errors.role}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ margin: "10px 20px" }}>
            <Col md={3}>
              <Form.Label>Avatar</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control style={{width: "60%"}}
                type="text"
                name="avatar"
                value={formik.values.avatar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.avatar && formik.errors.avatar ? (
                <div className="error">{formik.errors.avatar}</div>
              ) : null}
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-around" }}>
            <Col md={3}></Col>
            <Col md={9}>
              <Button
                type="submit"
                style={{ marginLeft: 80, width: "57.5%", backgroundColor: "#337ab7", color: "white" }}
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
        </Form>
      </div>
    </>
  );
}
