import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import FilterSidebar from './FilterSidebar'
export default function ProductPage() {
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const cartAPI = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/cart";
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchApi = () => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredProducts(data.map(product => ({ ...product, hovered: false }))); // Initialize filtered products with added hovered state
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // Handle filtering and sorting of products
  const handleFilteredProducts = (filteredData) => {
    setFilteredProducts(filteredData.map(product => ({ ...product, hovered: false })));
  };

  // Handle hover state for Add to Cart button
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
        addToCart(product);
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
          addToCart(product);
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
          addToCart(product);
        }
      }
  
      // Navigate to the cart page
      nav('/SWP391-MomAndBaby/cart');
    } catch (error) {
      console.error("Error handling add to cart:", error);
      // Optionally show error message to the user
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
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
                  {product.name}
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
    </Row>
  );
}
