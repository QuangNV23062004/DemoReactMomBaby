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
  const [brands, setBrands] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const renderProductCard = (product) => (
    <Col key={product.ID} onMouseEnter={() => handleMouseEnter(product.ID)} onMouseLeave={handleMouseLeave}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 300, position: "relative" }} image={product.mainImg} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "left", marginLeft: 10, color: "#d10024" }}>
            <b>{product.price} VNĐ</b>
          </Typography>
          {hoveredProductId === product.ID && (
            <div
              style={{
                position: "absolute",
                padding: "5px 20px",
                bottom: 200,
                left: 0,
                width: "100%",
                backgroundColor: "rgb(255,35,127)",
                textAlign: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#ffffff",
                  padding: "5px 20px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 25,
                  width: "80%",
                  color: "rgb(255,35,127)",
                }}
              >
                Add to Cart
              </button>
            </div>
          )}
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
          {data.filter((product) => product.priority === 2).map((product) => renderProductCard(product))}
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
        {data.filter((product) => product.priority === 1).map((product) => renderProductCard(product))}
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
        {data.map((product) => renderProductCard(product))}
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
