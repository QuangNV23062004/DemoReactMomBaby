import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Province from "../Resources/Province";
import District from "../Resources/District";
import Ward from "../Resources/Wards";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const baseURLCart = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart/";
  const baseURLAccount = "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
  const baseURLBill = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill";
  const baseURLVoucher = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher";
  const userId = sessionStorage.getItem("userId");
  const [account, setAccount] = useState({});
  const [cart, setCart] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [location, setLocation] = useState({
    selectedProvince: "",
    filteredDistricts: [],
    selectedDistrict: "",
    filteredWards: [],
    selectedWard: "",
  });

  const [voucher, setVoucher] = useState({
    voucherCode: "",
    discount: 0,
    appliedVoucher: null,
  });

  const nav = useNavigate();

  useEffect(() => {
    fetch(baseURLAccount + `${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Account fullname:", data.fullname);
        console.log("Account phone:", data.phone);
        console.log("Account email:", data.email);
        setAccount(data);
        setContactInfo({
          name: data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          address: "",
        });
      })
      .catch((error) => console.log(error));

    fetch(baseURLCart)
      .then((res) => res.json())
      .then((data) => setCart(data.filter((item) => item.userID === userId)))
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    if (location.selectedProvince) {
      const province = Province.find(
        (p) => p.name === location.selectedProvince
      );
      if (province) {
        const districts = District.filter(
          (d) => d.province_id === province.province_id
        );
        setLocation((prev) => ({
          ...prev,
          filteredDistricts: districts,
        }));
      }
    } else {
      setLocation((prev) => ({
        ...prev,
        filteredDistricts: [],
      }));
    }
    setLocation((prev) => ({
      ...prev,
      selectedDistrict: "",
      filteredWards: [],
    }));
  }, [location.selectedProvince]);

  useEffect(() => {
    if (location.selectedDistrict) {
      const district = District.find(
        (d) => d.name === location.selectedDistrict
      );
      if (district) {
        const wards = Ward.filter(
          (w) => w.district_id === district.district_id
        );
        setLocation((prev) => ({
          ...prev,
          filteredWards: wards,
        }));
      }
    } else {
      setLocation((prev) => ({
        ...prev,
        filteredWards: [],
      }));
    }
    setLocation((prev) => ({
      ...prev,
      selectedWard: "",
    }));
  }, [location.selectedDistrict]);

  const handleProvinceChange = (event) => {
    setLocation((prev) => ({
      ...prev,
      selectedProvince: event.target.value,
    }));
  };

  const handleDistrictChange = (event) => {
    setLocation((prev) => ({
      ...prev,
      selectedDistrict: event.target.value,
    }));
  };

  const handleWardChange = (event) => {
    setLocation((prev) => ({
      ...prev,
      selectedWard: event.target.value,
    }));
  };

  const handleApplyVoucher = () => {
    fetch(baseURLVoucher + `?code=${voucher.voucherCode}`)
      .then((res) => res.json())
      .then((voucherData) => {
        if (
          voucherData.length > 0 &&
          voucherData[0].quantity > 0 &&
          !voucherData[0].used.includes(userId)
        ) {
          const discountAmount = voucherData[0].discount;
          setVoucher((prev) => ({
            ...prev,
            discount: discountAmount,
            appliedVoucher: voucherData[0],
          }));
        } else {
          alert("Invalid voucher code or voucher has already been used.");
        }
      })
      .catch((error) => console.error("Error fetching voucher:", error));
  };

  const handlePlaceOrder = (values) => {
    console.log("Form values on submit:", values); // Debugging line

    const totalBeforeDiscount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let points = 0;
    if (totalBeforeDiscount > 500000) {
      points = 5000;
    } else if (totalBeforeDiscount > 300000) {
      points = 3000;
    } else if (totalBeforeDiscount > 100000) {
      points = 1000;
    }

    const updateUserPoints = async () => {
      try {
        const updatedAccount = { ...account, point: account.point + points };
        await fetch(baseURLAccount + `${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAccount),
        });
        console.log("User points updated successfully");
      } catch (error) {
        console.error("Error updating user points:", error);
      }
    };

    updateUserPoints();

    const total = totalBeforeDiscount - voucher.discount;
    const fullAddress = `${location.selectedProvince}, ${location.selectedDistrict}, ${location.selectedWard}, ${values.address}`;

    const orderDetails = {
      address: fullAddress,
      name: values.name,
      total: total,
      detail: cart,
      phone: values.phone,
      userID: userId,
      status: "pending",
      voucher: voucher.appliedVoucher ? voucher.appliedVoucher.code : "",
      checkoutDate: Math.floor(Date.now() / 1000), // current timestamp in seconds
    };

    if (values.paymentMethod === "Bank") {
      nav("/bank-payment", { state: { orderDetails, cart, userId, voucher } });
    } else if (values.paymentMethod === "Points") {
      if (account.point < total) {
        alert(`Insufficient points. You have ${account.point} points.`);
        return;
      }
      const updatedAccount = { ...account, point: account.point - total };
      fetch(baseURLAccount + `${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAccount),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Points deducted successfully:", data);
          orderDetails.paymentDetails = { method: "points" };
          fetch(baseURLBill, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Order placed successfully:", data);
              nav("/SWP391-MomAndBaby");
              cart.forEach((item) => {
                fetch(baseURLCart + item.id, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (response.ok) {
                      console.log(`Cart item ${item.id} removed successfully`);
                    } else {
                      console.error(`Failed to remove cart item ${item.id}`);
                    }
                  })
                  .catch((error) =>
                    console.error(`Error removing cart item ${item.id}:`, error)
                  );
              });

              if (voucher.appliedVoucher) {
                const updatedUsedArray = [...voucher.appliedVoucher.used, userId];
                const updatedQuantity = voucher.appliedVoucher.quantity - 1;

                fetch(baseURLVoucher + `/${voucher.appliedVoucher.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    used: updatedUsedArray,
                    quantity: updatedQuantity,
                  }),
                })
                  .then((response) => response.json())
                  .then((updatedVoucher) => {
                    console.log("Voucher updated:", updatedVoucher);
                    setVoucher((prev) => ({
                      ...prev,
                      appliedVoucher: null,
                    }));
                  })
                  .catch((error) => console.error("Error updating voucher:", error));
              }
            })
            .catch((error) => {
              console.error("Error placing order:", error);
            });
        })
        .catch((error) => console.error("Error updating user points:", error));
    } else {
      orderDetails.paymentDetails = { method: "cash" };
      fetch(baseURLBill, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order placed successfully:", data);
          nav("/SWP391-MomAndBaby");
          cart.forEach((item) => {
            fetch(baseURLCart + item.id, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  console.log(`Cart item ${item.id} removed successfully`);
                } else {
                  console.error(`Failed to remove cart item ${item.id}`);
                }
              })
              .catch((error) =>
                console.error(`Error removing cart item ${item.id}:`, error)
              );
          });

          if (voucher.appliedVoucher) {
            const updatedUsedArray = [...voucher.appliedVoucher.used, userId];
            const updatedQuantity = voucher.appliedVoucher.quantity - 1;

            fetch(baseURLVoucher + `/${voucher.appliedVoucher.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                used: updatedUsedArray,
                quantity: updatedQuantity,
              }),
            })
              .then((response) => response.json())
              .then((updatedVoucher) => {
                console.log("Voucher updated:", updatedVoucher);
                setVoucher((prev) => ({
                  ...prev,
                  appliedVoucher: null,
                }));
              })
              .catch((error) => console.error("Error updating voucher:", error));
          }
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    selectedProvince: Yup.string().required("Province is required"),
    selectedDistrict: Yup.string().required("District is required"),
    selectedWard: Yup.string().required("Ward is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  return (
    <>
      <Row
        style={{
          backgroundColor: "whitesmoke",
          borderRadius: 20,
          padding: "20px 5px",
        }}
      >
        <Col md={6}>
          <Formik
            enableReinitialize
            initialValues={{
              name: contactInfo.name,
              email: contactInfo.email,
              phone: contactInfo.phone,
              address: contactInfo.address,
              selectedProvince: location.selectedProvince,
              selectedDistrict: location.selectedDistrict,
              selectedWard: location.selectedWard,
              paymentMethod: "Cash",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handlePlaceOrder(values)}
          >
            {({ values, handleChange, handleSubmit }) => (
              <FormikForm onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-0"
                  controlId="Name.ControlInput1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>Name</Form.Label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="form-control"
                    style={{ width: "60%" }}
                  />
                  <ErrorMessage name="name" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="Email.ControlInput1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>
                    Email address
                  </Form.Label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="form-control"
                    style={{ width: "60%" }}
                  />
                  <ErrorMessage name="email" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="Phone.ControlInput2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>Phone</Form.Label>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="0123456789"
                    className="form-control"
                    style={{ width: "60%" }}
                  />
                  <ErrorMessage name="phone" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="Province.ControlInput3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>Province</Form.Label>
                  <Field
                    as="select"
                    name="selectedProvince"
                    className="form-select"
                    onChange={(e) => {
                      handleProvinceChange(e);
                      handleChange(e);
                    }}
                    style={{ width: "60%" }}
                  >
                    <option value="">Select Province</option>
                    {Province.map((province) => (
                      <option key={province.province_id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedProvince" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="District.ControlInput4"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>District</Form.Label>
                  <Field
                    as="select"
                    name="selectedDistrict"
                    className="form-select"
                    onChange={(e) => {
                      handleDistrictChange(e);
                      handleChange(e);
                    }}
                    disabled={!values.selectedProvince}
                    style={{ width: "60%" }}
                  >
                    <option value="">Select District</option>
                    {location.filteredDistricts.map((district) => (
                      <option key={district.district_id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedDistrict" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="Ward.ControlInput5"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>Ward</Form.Label>
                  <Field
                    as="select"
                    name="selectedWard"
                    className="form-select"
                    onChange={(e) => {
                      handleWardChange(e);
                      handleChange(e);
                    }}
                    disabled={!values.selectedDistrict}
                    style={{ width: "60%" }}
                  >
                    <option value="">Select Ward</option>
                    {location.filteredWards.map((ward) => (
                      <option key={ward.ward_id} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedWard" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="Address.ControlInput6"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>Address</Form.Label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="form-control"
                    style={{ width: "60%" }}
                  />
                  <ErrorMessage name="address" component="div" />
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="PaymentMethod.ControlInput7"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Label style={{ width: "20%" }}>Payment Method</Form.Label>
                  <Field
                    as="select"
                    name="paymentMethod"
                    className="form-select"
                    style={{ width: "60%" }}
                  >
                    <option value="Cash">Cash on delivery</option>
                    <option value="Bank">Banking</option>
                    <option value="Points">Use Points</option>
                  </Field>
                  <ErrorMessage name="paymentMethod" component="div" />
                </Form.Group>
                <Button type="submit" disabled={cart.length === 0}>
                  Place Order
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>

        <Col md={6}>
          <Form>
            <Form.Group
              className="mb-0"
              controlId="Voucher.ControlInput1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "20%" }}>Voucher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Voucher"
                value={voucher.voucherCode}
                onChange={(e) =>
                  setVoucher({ ...voucher, voucherCode: e.target.value })
                }
                style={{ width: "60%" }}
              />
              <Button
                variant="primary"
                onClick={handleApplyVoucher}
                style={{ width: "20%" }}
              >
                Apply
              </Button>
            </Form.Group>
          </Form>
          <h4>Order Details</h4>
          <ul style={{ listStyle: "none" }}>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  border: "1px solid black",
                }}
              >
                <img
                  src={item.productImage}
                  style={{ width: 50, height: 50, marginLeft: 20 }}
                  alt=""
                />
                {item.productName} x {item.quantity} - Price: {item.price}₫
              </li>
            ))}
          </ul>
          <p>
            Total:{" "}
            {cart.reduce(
              (sum, item) =>
                sum + item.price * item.quantity - voucher.discount,
              0
            )}
            ₫
          </p>
        </Col>
      </Row>
    </>
  );
}
