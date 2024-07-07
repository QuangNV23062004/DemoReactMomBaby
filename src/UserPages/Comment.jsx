import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function Comment({ ratings }) {
  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => (
      <FaStar
        key={index}
        size={20}
        color={index < rating ? "#ffc107" : "#e4e5e9"}
      />
    ));
  };

  if (!ratings || ratings.length === 0) {
    return <p>No ratings available.</p>; // Placeholder for no ratings
  }

  return (
    <Container>
      {ratings.map((item, index) => (
        <Row key={index} className="mb-3">
          <Card className="w-100">
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>{item.fullName}</b> - {item.userID}
                  </Card.Title>
                  <div>{renderStars(item.rate)}</div>
                  <Card.Text>{item.text}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      ))}
    </Container>
  );
}
