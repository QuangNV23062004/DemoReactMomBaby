import React, { useState, useEffect } from "react";
import Province from "../Resources/Province";
import District from "../Resources/District";
import Ward from "../Resources/Wards";
import Form from "react-bootstrap/Form";
import { Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const baseURLCart =
    "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart/";
  const baseURLAccount =
    "https://66801b4556c2c76b495b2d81.mockapi.io/Account/";
  const baseURLBill = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill";
  const baseURLVoucher =
    "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher";
  const userId = sessionStorage.getItem("userId");

  const [account, setAccount] = useState({});
  const [cart, setCart] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredWards, setFilteredWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [voucherCode, setVoucherCode] = useState(""); // State for voucher code
  const [discount, setDiscount] = useState(0); // State for discount amount

  const [appliedVoucher, setAppliedVoucher] = useState(null); // State to store applied voucher details

  useEffect(() => {
    fetch(baseURLAccount + `${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAccount(data);
        setName(data.fullname);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch((error) => console.log(error));

    fetch(baseURLCart)
      .then((res) => res.json())
      .then((data) =>
        setCart(data.filter((item) => item.userID === userId))
      )
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    if (selectedProvince) {
      const province = Province.find((p) => p.name === selectedProvince);
      if (province) {
        const districts = District.filter(
          (d) => d.province_id === province.province_id
        );
        setFilteredDistricts(districts);
      }
    } else {
      setFilteredDistricts([]);
    }
    setSelectedDistrict("");
    setFilteredWards([]);
  }, [selectedProvince]);
  const nav = useNavigate();
  useEffect(() => {
    if (selectedDistrict) {
      const district = District.find((d) => d.name === selectedDistrict);
      if (district) {
        const wards = Ward.filter(
          (w) => w.district_id === district.district_id
        );
        setFilteredWards(wards);
      }
    } else {
      setFilteredWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleApplyVoucher = () => {
    // Fetch voucher details based on voucher code
    fetch(baseURLVoucher + `?code=${voucherCode}`)
      .then((res) => res.json())
      .then((voucher) => {
        // Check if voucher is valid
        if (
          voucher.length > 0 &&
          voucher[0].quantity > 0 &&
          !voucher[0].used.includes(userId)
        ) {
          // Calculate discount
          const discountAmount = voucher[0].discount;
          setDiscount(discountAmount);

          // Store applied voucher details
          setAppliedVoucher(voucher[0]);
        } else {
          alert("Invalid voucher code or voucher has already been used.");
        }
      })
      .catch((error) =>
        console.error("Error fetching voucher:", error)
      );
  };

  const handlePlaceOrder = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity - discount,
      0
    );
    const fullAddress = `${selectedProvince}, ${selectedDistrict}, ${selectedWard}, ${address}`;

    const orderDetails = {
      address: fullAddress,
      name: name,
      total: total,
      detail: cart,
      phone: phone,
      userID: userId,
      status: "pending",
      voucher: appliedVoucher ? appliedVoucher.code : "", // Include voucher code in order details
    };

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
        nav('/SWP391-MomAndBaby');
        // Remove all cart items after successful order placement
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

        // Update voucher usage after order placement
        if (appliedVoucher) {
          const updatedUsedArray = [...appliedVoucher.used, userId];
          const updatedQuantity = appliedVoucher.quantity - 1;

          fetch(baseURLVoucher + `/${appliedVoucher.id}`, {
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
              setAppliedVoucher(null); // Reset applied voucher state
            })
            .catch((error) =>
              console.error("Error updating voucher:", error)
            );
        }
      })

      .catch((error) => {
        console.error("Error placing order:", error);
      });
      
  };

  return (
    <>
      <Row style={{ backgroundColor: "whitesmoke", borderRadius: 20, padding: "20px 5px" }}>
        <Col md={6}>
          <Form>
            <Form.Group
              className="mb-0"
              controlId="Name.ControlInput1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "20%" }}>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "60%" }} // Inline style for width
              />
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="Email.ControlInput1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "20%" }}>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "60%" }} // Inline style for width
              />
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="Phone.ControlInput2"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "20%" }}>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="0123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "60%" }} // Inline style for width
              />
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="ProvinceSelect"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "26%" }}>Province</Form.Label>
              <Form.Select
                aria-label="Province select"
                onChange={handleProvinceChange}
                style={{ width: "60%" }} // Inline style for width
              >
                <option value="">Select a province</option>
                {Province.map((province) => (
                  <option key={province.province_id} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="DistrictSelect"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "26%" }}>District</Form.Label>
              <Form.Select
                aria-label="District select"
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
                style={{ width: "60%" }} // Inline style for width
              >
                <option value="">Select a district</option>
                {filteredDistricts.map((district) => (
                  <option key={district.district_id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="WardSelect"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "26%" }}>Ward</Form.Label>
              <Form.Select
                aria-label="Ward select"
                onChange={handleWardChange}
                disabled={!selectedDistrict}
                style={{ width: "60%" }} // Inline style for width
              >
                <option value="">Select a ward</option>
                {filteredWards.map((ward) => (
                  <option key={ward.wards_id} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="Address.ControlInput1"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Form.Label style={{ width: "20%" }}>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "60%" }} // Inline style for width
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          {cart.map((product, index) => (
            <Row key={index} className="mb-0" style={{ backgroundColor: "white", border: "1px solid grey", borderRadius: 20 }}>
              <Col md={4} style={{ display: "flex" }}>
                <Image src={product.productImage} rounded fluid style={{ width: 100, height: 100, marginLeft: 40 }} />
              </Col>
              <Col md={8} style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <Row>
                    <h3 style={{ color: "orange" }}>{product.productName}</h3>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <b>Quantity:</b> {product.quantity}
                    </Col>
                    <Col md={4}></Col>
                    <Col md={5}>
                      <b>Price:</b> {product.price} VNĐ
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
          <Row className="mb-0" style={{ display: "flex", alignItems: "center" }}>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Button onClick={handleApplyVoucher}>Apply Voucher</Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h4>
                Total:{" "}
                {cart.reduce(
                  (sum, item) => sum + item.price * item.quantity - discount,
                  0
                )}{" "}
                VNĐ
              </h4>
            </Col>
          </Row>
        </Col>
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <Button onClick={handlePlaceOrder}>Place order</Button>
          </Col>
        </Row>
      </Row>
    </>
  );
}
