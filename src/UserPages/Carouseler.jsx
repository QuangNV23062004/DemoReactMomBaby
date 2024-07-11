import React, { useState, useEffect } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import ListCategory from "../Resources/Category";

export default function Carouseler() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const categorySet = new Set();
        data.forEach((product) => {
          categorySet.add(product.category);
        });
        setCategories(Array.from(categorySet));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Row>
        <Col md={2} style={{ border: "1px solid pink" }}>
          {categories.map((category, index) => (
            <div style={{ margin: "20px 5px" }} key={index}>
              <span>{category}</span>
            </div>
          ))}
        </Col>
        <Col md={10} style={{ border: "1px solid pink" }}>
          <Carousel
            data-bs-theme="dark"
            style={{
              padding: "0px 0px 0px 50px",
            }}
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/uploads/banner/052424125501_1715700987-HOME(1).png"
                alt="First slide"
                style={{ padding: 15 }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/uploads/banner/052424125506_1715832798-1960x640.png"
                alt="Second slide"
                style={{
                  padding: 15,
                }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/uploads/banner/052424125518_1716363523-HOME-TAKATO.png"
                alt="Third slide"
                style={{
                  padding: 15,
                }}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </>
  );
}
