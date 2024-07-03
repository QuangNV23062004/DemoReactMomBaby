import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation, useNavigate } from "react-router-dom";

export default function DetailProduct({ id }) {
  const location = useLocation();
  const currentUrl = location.pathname;
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart"; // Added cartAPI URL
  const [data, setData] = useState([]);
  const nav = useNavigate(); // Added navigate hook

  const handleAddToCart = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      // Redirect to login if user is not logged in
      nav("/SWP391-MomAndBaby/login");
      return;
    }

    try {
      // Fetch the user's cart
      const response = await fetch(`${cartAPI}?userID=${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
          // User has no cart, create a new cart with the product
          const newCartItem = {
            userID: userId,
            productID: product.id,
            productName: product.name,
            productImage: product.mainImg,
            price: product.price,
            quantity: 1,
            totalPrice: product.price,
          };

          const createResponse = await fetch(cartAPI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartItem),
          });

          if (!createResponse.ok) {
            throw new Error("Failed to create cart");
          }

          const createdCartItem = await createResponse.json();
          console.log("Product added to new cart:", createdCartItem);
          // showSuccessToast(product.name);
        } else {
          throw new Error("Failed to fetch user cart");
        }
      } else {
        // User has an existing cart, check if product is already in the cart
        const cartItems = await response.json();
        const existingCartItem = cartItems.find(
          (item) => item.productID === product.id
        );

        if (existingCartItem) {
          // Product is already in the cart, update the quantity
          const updatedQuantity = existingCartItem.quantity + 1;
          const updatedTotalPrice = updatedQuantity * product.price;
          const updatedCartItem = {
            ...existingCartItem,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };

          const updateResponse = await fetch(
            `${cartAPI}/${existingCartItem.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedCartItem),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update cart item");
          }

          const updatedItem = await updateResponse.json();
          console.log("Product quantity updated in cart:", updatedItem);
          // showSuccessToast(product.name);
        } else {
          // Product is not in the cart, add it as a new item
          const newCartItem = {
            userID: userId,
            productID: product.id,
            productName: product.name,
            productImage: product.mainImg,
            price: product.price,
            quantity: 1,
            totalPrice: product.price,
          };

          const createResponse = await fetch(cartAPI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCartItem),
          });

          if (!createResponse.ok) {
            throw new Error("Failed to add product to cart");
          }

          const createdCartItem = await createResponse.json();
          console.log("Product added to cart:", createdCartItem);
          // showSuccessToast(product.name);
        }
      }
    } catch (error) {
      console.error("Error handling add to cart:", error);
      // Handle error scenarios, e.g., show error message to user
      // Example: showErrorToast("Failed to add product to cart. Please try again later.");
    }
  };

  const fetchApi = () => {
    fetch(baseURL + id)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const productDetails = [
    { label: "Mẫu sản phẩm", value: data.model },
    { label: "Danh mục sản phẩm", value: data.category },
    { label: "Thương hiệu sản phẩm", value: data.brand },
    { label: "Nhà sản xuất", value: data.producer },
  ];

  return (
    <Container style={{ backgroundColor: "whitesmoke", padding: 50 }}>
      <Row style={{ backgroundColor: "white" }}>
        <Col
          md={5}
          style={{
            display: "flex",
            justifyContent: "right",
            paddingRight: "50px",
          }}
        >
          <img style={{ height: 400 }} src={data.mainImg} alt="alt" />
        </Col>
        <Col md={7} style={{ display: "flex", alignItems: "center" }}>
          <ListGroup>
            <ListGroup.Item>
              {" "}
              <h2 style={{ color: "red" }}>{data.name}</h2>
              <p style={{ fontSize: 17, fontStyle: "italic" }}>
                (In stock: {data.quantity} | Sold: {data.sold})
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <h3>
                Price: <span style={{}}>{data.price}</span> VNĐ
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <p>
                <b>Model:</b> {data.model}
              </p>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <p>
                <b>Category:</b> {data.category}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <p>
                <b>Brand:</b> {data.brand}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <p>
                <b>Producer:</b> {data.producer}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "white", padding: "10px 20px" }}>
        <Col md={5}></Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => handleAddToCart(data)} // Pass data to handleAddToCart
            style={{ width: "40%" }}
          >
            Add to cart
          </Button>{" "}
        </Col>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: 50, paddingLeft: 10 }}>
        {["md"].map((breakpoint) =>
          productDetails.map((detail) => (
            <ListGroup
              key={`${breakpoint}-${detail.label}`}
              horizontal={breakpoint}
              className="my-2"
            >
              <Col md={6}>
                <ListGroup.Item>
                  {" "}
                  <b>{detail.label}: </b>
                </ListGroup.Item>
              </Col>
              <Col md={6}>
                <ListGroup.Item>{detail.value}</ListGroup.Item>
              </Col>
            </ListGroup>
          ))
        )}
      </Row>
    </Container>
  );
}
