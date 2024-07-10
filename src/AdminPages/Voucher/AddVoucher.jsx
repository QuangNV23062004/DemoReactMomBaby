import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddVoucher() {
  const validationSchema = Yup.object({
    code: Yup.string()
      .min(5, 'Code must be at least 5 characters')
      .required('Required')
      .test('checkUnique', 'Code already exists', async function(value) {
        try {
          const response = await fetch(`https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher`);
          const data = await response.json();
          const isUnique = !data.some(voucher => voucher.code === value);
          return isUnique;
        } catch (error) {
          console.error('Error checking voucher code:', error);
          return false;
        }
      }),
    discount: Yup.number()
      .positive('Discount must be a positive number')
      .required('Required'),
    quantity: Yup.number()
      .positive('Quantity must be greater than zero')
      .required('Required'),
    expiration: Yup.date()
      .min(new Date(), 'Expiration date must be in the future')
      .required('Required')
  });

  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      code: "",
      discount: "",
      quantity: "",
      expiration: new Date()
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Voucher added successfully:", data);
          formik.resetForm();
          toast.success('Voucher added successfully', {
            onClose: () => nav('/SWP391-MomAndBaby/admin/voucher')
          });
        } else {
          throw new Error('Failed to add voucher');
        }
      } catch (error) {
        console.error("Error adding voucher:", error);
        toast.error(`Failed to add voucher: ${error.message}`);
      }
    }
  });

  return (
    <div>
      <h2>Add New Voucher</h2>
      <ToastContainer />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="code">
          <Row>
            <Col md={3}>
              <Form.Label>Voucher Code</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Enter voucher code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.code && formik.touched.code}
                style={{ width: "60%" }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.code}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="discount">
          <Row>
            <Col md={3}>
              <Form.Label>Discount</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                placeholder="Enter discount amount"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.discount && formik.touched.discount}
                style={{ width: "60%" }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.discount}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Row>
            <Col md={3}>
              <Form.Label>Quantity</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="number"
                placeholder="Enter quantity available"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.quantity && formik.touched.quantity}
                style={{ width: "60%" }}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.quantity}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="expiration">
          <Row>
            <Col md={3}>
              <Form.Label>Expiration Date</Form.Label>
            </Col>
            <Col md={9}>
              <DatePicker
                value={formik.values.expiration}
                onChange={(value) => formik.setFieldValue('expiration', value)}
                format="YYYY-MM-DD"
                clearIcon={null}
                style={{ width: '100%' }}
              />
              {formik.errors.expiration && formik.touched.expiration && (
                <div className="invalid-feedback d-block">
                  {formik.errors.expiration}
                </div>
              )}
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Voucher
        </Button>
      </Form>
    </div>
  );
}
