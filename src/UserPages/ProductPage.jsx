import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Product from '../Resources/Product'
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
export default function ProductPage() {
    return (
    <Row style={{display: 'flex', justifyContent: 'space-evenly', margin: 10, marginBottom: 50}}> 
       {Product.map((product) => {
         return(<Col md={4}> <Card sx={{ width: "100%" }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card></Col>);
       })}
        
    </Row>
  )
}
