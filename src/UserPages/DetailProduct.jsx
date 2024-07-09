import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import Comment from "./Comment";

export default function DetailProduct({ id }) {
  const location = useLocation();
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const PreOrderAPI = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Preorder";
  const [data, setData] = useState({});
  const nav = useNavigate();
  const [review,setReview] = useState([]);
  useEffect(() => {
    const fetchApi = () => {
      fetch(baseURL + id)
        .then((response) => response.json())
        .then((data) => {setData(data),setReview(data.rating)})
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
          toast.success(
            `${product.name} quantity updated in cart successfully!`
          );
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

  const handlePreorder = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      nav("/SWP391-MomAndBaby/login");
      return;
    }

    try {
      const response = await fetch(`${PreOrderAPI}?userID=${userId}`);
      const preorders = await response.json();

      const existingPreorder = preorders.find(
        (item) => item.productID === product.id
      );

      if (existingPreorder) {
        toast.error("You've already preordered this product.");
      } else {
        const newPreorder = {
          userID: userId,
          productID: product.id,
          productName: product.name,
          productImage: product.mainImg,
          price: product.price,
        };

        const createResponse = await fetch(PreOrderAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPreorder),
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create preorder");
        }

        const createdPreorder = await createResponse.json();
        console.log("Preorder created:", createdPreorder);
        toast.success("Preorder placed successfully!");
      }
    } catch (error) {
      console.error("Error handling preorder:", error);
      toast.error("Failed to place preorder. Please try again later.");
    }
  };

  const calculateAverageRating = (ratings) => {
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.rate, 0);
    return totalRatings > 0 ? Math.round(sumRatings / totalRatings) : 0;
  };

  const productDetails = [
    { label: "Mẫu sản phẩm", value: data.model },
    { label: "Danh mục sản phẩm", value: data.category },
    { label: "Thương hiệu sản phẩm", value: data.brand },
    { label: "Nhà sản xuất", value: data.producer },
  ];

  if (!data) return <p>Loading...</p>;

  const averageRating = data.rating ? calculateAverageRating(data.rating) : 0;

  return (
    <Container style={{ backgroundColor: "whitesmoke", padding: 50 }}>
      <ToastContainer />
      <Row style={{ backgroundColor: "white" }}>
        <Col
          md={5}
          style={{
            display: "flex",
            justifyContent: "right",
            paddingRight: "50px",
          }}
        >
          <img style={{ height: 400 }} src={data.mainImg} alt={data.name} />
        </Col>
        <Col md={7} style={{ display: "flex", alignItems: "center" }}>
          <ListGroup>
            <ListGroup.Item>
              <h2 style={{ color: "red" }}>{data.name}</h2>
              <div>
                <span>Rating: </span>
                {[...Array(5)].map((star, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    color={index < averageRating ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
                <span style={{fontStyle: "italic"}}>  ({review.length} rated)</span>
              </div> 
              <p style={{ fontSize: 17, fontStyle: "italic" }}>
                (In stock: {data.quantity})
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
          {data.quantity > 0 ? (
            <Button
              variant="outline-success"
              onClick={() => handleAddToCart(data)}
              style={{ width: "40%", marginBottom: 10 }}
            >
              Add to cart
            </Button>
          ) : (
            <Button
              variant="outline-success"
              onClick={() => handlePreorder(data)}
              style={{ width: "40%", marginBottom: 10 }}
            >
              Pre-order
            </Button>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: 20, backgroundColor: "white", padding: 20 }}>
        <h2 style={{color: "orange"}}>Comments section: </h2>
        <Comment ratings={data.rating} />
      </Row>
    </Container>
  );
}
