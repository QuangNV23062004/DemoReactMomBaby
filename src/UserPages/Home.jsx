import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export default function Home() {
  const [data, setData] = useState([]);
  const [priorityTwoData, setPriorityTwoData] = useState([]);
  const [priorityOneData, setPriorityOneData] = useState([]);
  const [brands, setBrands] = useState([]);
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart"; // MockAPI URL for the cart resource
  const nav = useNavigate();

  const handleAddToCart = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      // Redirect to login if user is not logged in
      nav('/SWP391-MomAndBaby/login');
      return;
    }

    try {
      // Fetch the user's cart
      const response = await fetch(`${cartAPI}?userID=${userId}`);
      const cartItems = await response.json();

      if (cartItems.length === 0) {
        // User has no cart, create a new cart with the product
        const newCartItem = {
          userID: userId,
          productID: product.id,
          productName: product.name,
          productImage: product.mainImg,
          price: product.price,
          quantity: 1,
          totalPrice: product.price
        };

        const createResponse = await fetch(cartAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCartItem)
        });

        if (!createResponse.ok) {
          throw new Error('Failed to create cart');
        }

        const createdCartItem = await createResponse.json();
        console.log("Product added to new cart:", createdCartItem);
        showSuccessToast(product.name);
      } else {
        // User has an existing cart, check if product is already in the cart
        const existingCartItem = cartItems.find(item => item.productID === product.id);

        if (existingCartItem) {
          // Product is already in the cart, update the quantity
          const updatedQuantity = existingCartItem.quantity + 1;
          const updatedTotalPrice = updatedQuantity * product.price;
          const updatedCartItem = {
            ...existingCartItem,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice
          };

          const updateResponse = await fetch(`${cartAPI}/${existingCartItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCartItem)
          });

          if (!updateResponse.ok) {
            throw new Error('Failed to update cart item');
          }

          const updatedItem = await updateResponse.json();
          console.log("Product quantity updated in cart:", updatedItem);
          showSuccessToast(product.name);
        } else {
          // Product is not in the cart, add it as a new item
          const newCartItem = {
            userID: userId,
            productID: product.id,
            productName: product.name,
            productImage: product.mainImg,
            price: product.price,
            quantity: 1,
            totalPrice: product.price
          };

          const createResponse = await fetch(cartAPI, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCartItem)
          });

          if (!createResponse.ok) {
            throw new Error('Failed to add product to cart');
          }

          const createdCartItem = await createResponse.json();
          console.log("Product added to cart:", createdCartItem);
          showSuccessToast(product.name);
        }
      }
    } catch (error) {
      console.error("Error handling add to cart:", error);
    }
  };

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data.map(product => ({ ...product, hovered: false }))); // Initialize products with added hovered state
        setPriorityTwoData(data.filter(product => product.priority === 2));
        setPriorityOneData(data.filter(product => product.priority === 1));
        const brandSet = new Set();
        data.forEach((product) => {
          brandSet.add(product.brand);
        });
        setBrands(Array.from(brandSet));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleMouseEnter = (index, setState) => {
    setState(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].hovered = true;
      return updatedProducts;
    });
  };

  const handleMouseLeave = (index, setState) => {
    setState(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].hovered = false;
      return updatedProducts;
    });
  };

  const renderProductCard = (product, index, setState) => (
    <Col 
      key={product.id} 
      onMouseEnter={() => handleMouseEnter(index, setState)} 
      onMouseLeave={() => handleMouseLeave(index, setState)}
      style={{ position: 'relative' }}
    >
      <Card sx={{ maxWidth: 345, position: 'relative' }}>
        <CardMedia sx={{ height: 300 }} image={product.mainImg} />
        {product.hovered && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}>
            <button style={{
              backgroundColor: '#ff469e',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer'
            }} onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "left", marginLeft: 10, color: "#d10024" }}>
            <b>{product.price} VNĐ</b>
          </Typography>
        </CardContent>
      </Card>
    </Col>
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const showSuccessToast = (productName) => {
    toast.success(`${productName} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      <ToastContainer /> {/* ToastContainer for notifications */}
      {/* Rest of your component */}
      <Row>
        <Carousel responsive={responsive}>
          {priorityTwoData.map((product, index) => (
            renderProductCard(product, index, setPriorityTwoData)
          ))}
        </Carousel>
      </Row>
      {/* Render other sections as per your UI */}
    </Container>
  );
}
