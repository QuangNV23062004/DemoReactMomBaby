import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";
export default function DetailProduct() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";
  const [data, setData] = useState([]);

  const fetchApi = () => {
    fetch(baseURL + "12")
      .then((response) => response.json())
      .then((data) => {
        // Add a 'selected' property to each item for checkbox control

        setData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={7} style={{ display: "flex", justifyContent: "center" }}>
          <img style={{ height: 400 }} src={data.mainImg}  alt="alt" />
        </Col>
        <Col md={5} >
          <ListGroup>
            <ListGroup.Item> <h2 style={{}}>{data.name}</h2> </ListGroup.Item>
            <ListGroup.Item> <h3>{data.price}</h3></ListGroup.Item>
            <ListGroup.Item> <p>{data.description}</p> </ListGroup.Item>
            <ListGroup.Item> <p>Tồn kho: {data.quantity} (đã bán: {data.sold})</p></ListGroup.Item>
            <ListGroup.Item>Model: {data.model}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
