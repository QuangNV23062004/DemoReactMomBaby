import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateVoucher() {
  const validationSchema = Yup.object({
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

  const { id } = useParams();
  const nav = useNavigate();
  const [voucherData, setVoucherData] = useState(null);

  useEffect(() => {
    fetchVoucher();
  }, []);

  const fetchVoucher = async () => {
    try {
      const response = await fetch(`https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher/${id}`);
      if (response.ok) {
        const data = await response.json();
        setVoucherData(data);
      } else {
        throw new Error('Failed to fetch voucher');
      }
    } catch (error) {
      console.error('Error fetching voucher:', error);
      toast.error(`Failed to fetch voucher: ${error.message}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      discount: voucherData ? voucherData.discount : "",
      quantity: voucherData ? voucherData.quantity : "",
      expiration: voucherData ? new Date(voucherData.expiration) : new Date()
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Voucher updated successfully:", data);
          toast.success('Voucher updated successfully', {
            onClose: () => nav('/SWP391-MomAndBaby/admin/voucher')
          });
        } else {
          throw new Error('Failed to update voucher');
        }
      } catch (error) {
        console.error("Error updating voucher:", error);
        toast.error(`Failed to update voucher: ${error.message}`);
      }
    }
  });

  return (
    <div>
      <h2>Update Voucher</h2>
      <ToastContainer />
      <Form onSubmit={formik.handleSubmit}>
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
          Update Voucher
        </Button>
      </Form>
    </div>
  );
}
