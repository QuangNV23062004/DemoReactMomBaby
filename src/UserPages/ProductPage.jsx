import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';

export default function ProductPage() {
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
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
                <div style={{ position: "absolute",padding: "5px 20px", bottom: 200, left: 0, width: "100%", backgroundColor: "rgb(255,35,127)", textAlign: "center" }}>
                  <button style={{ backgroundColor: "#ffffff", padding: "5px 20px", border: "none", cursor: "pointer", borderRadius: 25, width: "80%" ,color: "rgb(255,35,127)"}}>Add to Cart</button>
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
