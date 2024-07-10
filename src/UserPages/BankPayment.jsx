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

  const handleConfirm = async (values) => {
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

    await processOrder(values);
  };

  const processOrder = async (values) => {
    const totalBeforeDiscount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let points = 0;
    if (totalBeforeDiscount > 500000) {
      points = 2500;
    } else if (totalBeforeDiscount > 300000) {
      points = 1500;
    } else if (totalBeforeDiscount > 100000) {
      points = 500;
    }

    try {
      const response = await fetch("https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...orderDetails, 
          paymentDetails: values,
          checkoutDate: Math.floor(Date.now() / 1000) // current timestamp in seconds
        }),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        nav("/SWP391-MomAndBaby");

        await Promise.all(
          cart.map((item) =>
            fetch("https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart/" + item.id, {
              method: "DELETE",
            }).then((response) => {
              if (!response.ok) {
                console.error(`Failed to remove cart item ${item.id}`);
              }
            })
          )
        );

        if (voucher.appliedVoucher) {
          const updatedUsedArray = [...voucher.appliedVoucher.used, userId];
          const updatedQuantity = voucher.appliedVoucher.quantity - 1;

          await fetch("https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher/" + voucher.appliedVoucher.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              used: updatedUsedArray,
              quantity: updatedQuantity,
            }),
          });
        }

        const accountResponse = await fetch(`https://66801b4556c2c76b495b2d81.mockapi.io/Account/${userId}`);
        const accountData = await accountResponse.json();

        if (!accountData.point) {
          accountData.point = 0;
        }

        const updatedAccount = { ...accountData, point: accountData.point + points };

        await fetch(`https://66801b4556c2c76b495b2d81.mockapi.io/Account/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAccount),
        });
        console.log("User points updated successfully");
      } else {
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      console.error("Error processing payment and placing order:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    bank: Yup.string().required("Bank is required"),
    cardNumber: Yup.string().required("Card Number is required"),
    cardHolder: Yup.string().required("Card Holder is required"),
    issuedDate: Yup.string().required("Issued Date is required"),
    otp: Yup.string().when("otpRequired", {
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
            otpRequired: showOTP,
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
