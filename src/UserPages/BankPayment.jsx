import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";

const bankCards = [
  {
    bank: "NCB",
    cardNumber: "9704198526191432198",
    cardHolder: "NGUYEN VAN A",
    issuedDate: "07/15",
    otp: "123456",
    note: "Thành công",
  },
  {
    bank: "NCB",
    cardNumber: "9704195798459170488",
    cardHolder: "NGUYEN VAN A",
    issuedDate: "07/15",
    note: "Thẻ không đủ số dư",
  },
  {
    bank: "NCB",
    cardNumber: "9704192181368742",
    cardHolder: "NGUYEN VAN A",
    issuedDate: "07/15",
    note: "Thẻ chưa kích hoạt",
  },
  {
    bank: "NCB",
    cardNumber: "9704193370791314",
    cardHolder: "NGUYEN VAN A",
    issuedDate: "07/15",
    note: "Thẻ bị khóa",
  },
];

export default function BankPayment() {
  const location = useLocation();
  const nav = useNavigate();
  const { orderDetails, cart, userId, voucher } = location.state;

  const [showOTP, setShowOTP] = useState(false);
  const [cardNote, setCardNote] = useState("");

  const handleConfirm = (values) => {
    const card = bankCards.find(
      (card) =>
        card.bank === values.bank &&
        card.cardNumber === values.cardNumber &&
        card.cardHolder === values.cardHolder &&
        card.issuedDate === values.issuedDate
    );

    if (!card) {
      alert("Invalid card details");
      return;
    }

    if (card.note !== "Thành công") {
      alert(card.note);
      return;
    }

    if (!showOTP) {
      setShowOTP(true);
      return;
    }

    if (card.otp !== values.otp) {
      alert("Invalid OTP");
      return;
    }

    fetch("https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...orderDetails, paymentDetails: values }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Order placed successfully!");
        nav("/SWP391-MomAndBaby");
        cart.forEach((item) => {
          fetch(
            "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart/" + item.id,
            { method: "DELETE" }
          )
            .then((response) => {
              if (response.ok)
                console.log(`Cart item ${item.id} removed successfully`);
              else
                console.error(`Failed to remove cart item ${item.id}`);
            })
            .catch((error) =>
              console.error(`Error removing cart item ${item.id}:`, error)
            );
        });

        if (voucher.appliedVoucher) {
          const updatedUsedArray = [...voucher.appliedVoucher.used, userId];
          const updatedQuantity = voucher.appliedVoucher.quantity - 1;

          fetch(
            "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher" +
              `/${voucher.appliedVoucher.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                used: updatedUsedArray,
                quantity: updatedQuantity,
              }),
            }
          )
            .then((response) => response.json())
            .then((updatedVoucher) => {
              console.log("Voucher updated:", updatedVoucher);
            })
            .catch((error) =>
              console.error("Error updating voucher:", error)
            );
        }
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  const validationSchema = Yup.object().shape({
    bank: Yup.string().required("Bank is required"),
    cardNumber: Yup.string().required("Card Number is required"),
    cardHolder: Yup.string().required("Card Holder is required"),
    issuedDate: Yup.string().required("Issued Date is required"),
    otp: Yup.string().when("showOTP", {
      is: true,
      then: Yup.string().required("OTP is required"),
    }),
  });

  return (
    <Row
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: 20,
        padding: "20px 5px",
      }}
    >
      <Col md={6}>
        <Formik
          initialValues={{
            bank: "NCB",
            cardNumber: "",
            cardHolder: "",
            issuedDate: "",
            otp: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleConfirm(values)}
        >
          {({ handleSubmit, values }) => (
            <FormikForm onSubmit={handleSubmit}>
              <Form.Group
                className="mb-0"
                controlId="Bank.ControlInput1"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Form.Label style={{ width: "20%" }}>Bank</Form.Label>
                <Field
                  as="select"
                  name="bank"
                  className="form-select"
                  style={{ width: "60%" }}
                >
                  <option value="NCB">NCB</option>
                </Field>
                <ErrorMessage name="bank" component="div" />
              </Form.Group>
              <Form.Group
                className="mb-0"
                controlId="CardNumber.ControlInput2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Form.Label style={{ width: "20%" }}>Card Number</Form.Label>
                <Field
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  className="form-control"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="cardNumber" component="div" />
              </Form.Group>
              <Form.Group
                className="mb-0"
                controlId="CardHolder.ControlInput3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Form.Label style={{ width: "20%" }}>Card Holder</Form.Label>
                <Field
                  type="text"
                  name="cardHolder"
                  placeholder="Card Holder"
                  className="form-control"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="cardHolder" component="div" />
              </Form.Group>
              <Form.Group
                className="mb-0"
                controlId="IssuedDate.ControlInput4"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Form.Label style={{ width: "20%" }}>Issued Date</Form.Label>
                <Field
                  type="text"
                  name="issuedDate"
                  placeholder="MM/YY"
                  className="form-control"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="issuedDate" component="div" />
              </Form.Group>
              {showOTP && (
                <Form.Group
                  className="mb-0"
                  controlId="Otp.ControlInput5"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>OTP</Form.Label>
                  <Field
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    className="form-control"
                    style={{ width: "60%" }}
                  />
                  <ErrorMessage name="otp" component="div" />
                </Form.Group>
              )}
              <Button type="submit">Confirm</Button>
            </FormikForm>
          )}
        </Formik>
      </Col>
    </Row>
  );
}
