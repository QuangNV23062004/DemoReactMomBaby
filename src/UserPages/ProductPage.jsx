import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Col, Row } from 'react-bootstrap';
import FilterSidebar from './FilterSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductPage() {
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const nav = useNavigate();

  const fetchApi = () => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredProducts(data.map(product => ({ ...product, hovered: false })));
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleFilteredProducts = (filteredData) => {
    setFilteredProducts(filteredData.map(product => ({ ...product, hovered: false })));
  };

  const handleMouseEnter = (index) => {
    setFilteredProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].hovered = true;
      return updatedProducts;
    });
  };

  const handleMouseLeave = (index) => {
    setFilteredProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].hovered = false;
      return updatedProducts;
    });
  };

  const showSuccessToast = (productName) => {
    toast.success(`${productName} added to cart successfully!`);
  };

  const showErrorToast = (message) => {
    toast.error(message);
  };

  const handleAddToCart = async (product) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      nav('/SWP391-MomAndBaby/login');
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
          throw new Error('Failed to fetch user cart');
        }
      } else {
        const cartItems = await response.json();
        const existingCartItem = cartItems.find(item => item.productID === product.id);

        if (existingCartItem) {
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

      // Decrement product quantity in the product API
      const updatedProductQuantity = product.quantity - 1;
      const updatedProduct = {
        ...product,
        quantity: updatedProductQuantity
      };

      const productUpdateResponse = await fetch(`${baseURL}/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!productUpdateResponse.ok) {
        throw new Error('Failed to update product quantity');
      }

      setFilteredProducts(prevProducts => 
        prevProducts.map(p => p.id === product.id ? updatedProduct : p)
      );

      console.log("Product quantity updated:", updatedProduct);
    } catch (error) {
      console.error("Error handling add to cart:", error);
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  return (
    <Row style={{ display: 'flex', justifyContent: 'space-evenly', margin: 10, marginBottom: 50 }}>
      <Col md={3} style={{ height: "100%" }}>
        <FilterSidebar products={data} setFilteredProducts={handleFilteredProducts} />
      </Col>
      <Col md={9} style={{ display: 'inline' }}>
        {filteredProducts.map((product, index) => (
          <Col key={index} md={4} style={{ display: 'inline-flex', marginBottom: 20 }}>
            <Card
              sx={{ width: "100%", position: "relative" }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div style={{ position: 'relative' }}>
                <CardMedia
                  sx={{ height: 300, position: "relative" }}
                  image={product.mainImg}
                  title={product.name}
                />
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
                    }} 
                    onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
                  <Link to={`/SWP391-MomAndBaby/product/detail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {product.name}
                  </Link>
                </Typography>
                <Typography gutterBottom variant='h6' component="div" style={{ textAlign: 'left', marginLeft: 10, color: "#d10024" }}>
                  <b>{product.price} VNĐ</b>
                </Typography>
              </CardContent>
              <CardActions>
                {/* Add actions as needed */}
              </CardActions>
            </Card>
          </Col>
        ))}
      </Col>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Row>
  );
}
