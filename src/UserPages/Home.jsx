import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Row, Col } from "react-bootstrap";
import Carouseler from "./Carouseler";
import Product from "../Resources/Product";
import Brand from "../Resources/Brand";
import { useState } from "react";
export default function Home() {
  const [data1,useData1] = useState()
  return (
    <Container>
      <Carouseler></Carouseler>
      <br />
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "15px", height: "100%", backgroundColor: "red" }}
          >
            |
          </div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Today's</div>
        </div>
      </Row>
      <br /> 
      <Row style={{display: "flex",justifyContent: "center"}}>
        {Product.map((product) => 
        {return(product.priority === 2 ? <Col md={3}> <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 300 }}
            image={product.mainImg}
            
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{height: 40}}>
              {product.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card></Col> : <></>)})}
      </Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "15px", height: "100%", backgroundColor: "red" }}
          >
            |
          </div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Brand</div>
        </div>
      </Row>
      <br /> <Row></Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "15px", height: "100%", backgroundColor: "red" }}
          >
            |
          </div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>This Month</div>
        </div>
      </Row>
      <br /> <Row></Row>
      <Row>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "15px", height: "100%", backgroundColor: "red" }}
          >
            |
          </div>
          <div style={{ marginLeft: 10, color: "#db4444" }}>Our product</div>
        </div>
      </Row>
    </Container>
  );
}
