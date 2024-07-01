import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Row, Col } from "react-bootstrap";
import Carouseler from "./Carouseler";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [priorityTwoData, setPriorityTwoData] = useState([]);
  const [priorityOneData, setPriorityOneData] = useState([]);
  const [brands, setBrands] = useState([]);
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";

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
      key={product.ID} 
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
            }}>
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

  return (
    <Container>
      <Carouseler />
      <br />
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Today's</div>
        </div>
      </Row>
      <br />
      <Row>
        <Carousel responsive={responsive}>
          {priorityTwoData.map((product, index) => renderProductCard(product, index, setPriorityTwoData))}
        </Carousel>
      </Row>
      <Row>
        <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
          <Button
            style={{
              padding: 10,
              color: "#fff",
              backgroundColor: "#ff469e",
              marginBottom: 10,
            }}
          >
            View All Products
          </Button>
        </div>
      </Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Brands</div>
        </div>
      </Row>
      <br />
      <Carousel responsive={responsive}>
        {brands.map((brand, index) => (
          <Col key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {brand}
                </Typography>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Carousel>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>This Month</div>
        </div>
      </Row>
      <br />
      <Carousel responsive={responsive}>
        {priorityOneData.map((product, index) => renderProductCard(product, index, setPriorityOneData))}
      </Carousel>
      <Row>
        <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
          <Button
            style={{
              padding: 10,
              color: "#fff",
              backgroundColor: "#ff469e",
              marginBottom: 10,
            }}
          >
            View All Products
          </Button>
        </div>
      </Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Our product</div>
        </div>
      </Row>
      <br />
      <Carousel responsive={responsive}>
        {data.map((product, index) => renderProductCard(product, index, setData))}
      </Carousel>
      <Row>
        <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
          <Button
            style={{
              padding: 10,
              color: "#fff",
              backgroundColor: "#ff469e",
              marginBottom: 10,
            }}
          >
            View All Products
          </Button>
        </div>
      </Row>
    </Container>
  );
}
