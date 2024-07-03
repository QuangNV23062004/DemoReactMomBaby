import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailProduct({ id }) {
  const location = useLocation();
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const [data, setData] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const fetchApi = () => {
      fetch(baseURL + id)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    };

    fetchApi();
  }, [id]);

  const handleAddToCart = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      nav("/SWP391-MomAndBaby/login");
      return;
    }

    if (product.quantity <= 0) {
      toast.error("Sorry, this product is out of stock.");
      return;
    }

    try {
      const response = await fetch(`${cartAPI}?userID=${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
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
          toast.success(`${product.name} added to cart successfully!`);
        } else {
          throw new Error("Failed to fetch user cart");
        }
      } else {
        const cartItems = await response.json();
        const existingCartItem = cartItems.find(
          (item) => item.productID === product.id
        );

        if (existingCartItem) {
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
          toast.success(`${product.name} quantity updated in cart successfully!`);
        } else {
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
          toast.success(`${product.name} added to cart successfully!`);
        }
      }

      const updatedProductQuantity = product.quantity - 1;
      const updatedProduct = {
        ...product,
        quantity: updatedProductQuantity,
      };

      const productUpdateResponse = await fetch(`${baseURL}/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!productUpdateResponse.ok) {
        throw new Error("Failed to update product quantity");
      }

      setData(updatedProduct);
      console.log("Product quantity updated:", updatedProduct);
    } catch (error) {
      console.error("Error handling add to cart:", error);
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  const productDetails = [
    { label: "Mẫu sản phẩm", value: data.model },
    { label: "Danh mục sản phẩm", value: data.category },
    { label: "Thương hiệu sản phẩm", value: data.brand },
    { label: "Nhà sản xuất", value: data.producer },
  ];

  return (
    <Container style={{ backgroundColor: "whitesmoke", padding: 50 }}>
      <ToastContainer />
      <Row style={{ backgroundColor: "white" }}>
        <Col
          md={7}
          style={{
            display: "flex",
            justifyContent: "right",
            paddingRight: "50px",
          }}
        >
          <img style={{ height: 400 }} src={data.mainImg} alt={data.name} />
        </Col>
        <Col md={5} style={{ display: "flex", alignItems: "center" }}>
          <ListGroup>
            <ListGroup.Item>
              <h2 style={{ color: "red" }}>{data.name}</h2>
              <p style={{ fontSize: 17, fontStyle: "italic" }}>
                (In stock: {data.quantity} | Sold: {data.sold})
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>
                Price: <span>{data.price}</span> VNĐ
              </h3>
            </ListGroup.Item>
            {productDetails.map((detail, index) => (
              <ListGroup.Item key={index}>
                <p>
                  <b>{detail.label}:</b> {detail.value}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "white", padding: "10px 20px" }}>
        <Col md={5}></Col>
        <Col>
          <Button
            variant="outline-success"
            onClick={() => handleAddToCart(data)}
            style={{ width: "40%" }}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
