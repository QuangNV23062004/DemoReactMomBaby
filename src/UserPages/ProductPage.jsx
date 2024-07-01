import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import { useCart } from './cartContext'; // Import useCart
import { Link } from 'react-router-dom'; // Import Link

export default function ProductPage() {
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart(); // Get addToCart from useCart

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

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
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
