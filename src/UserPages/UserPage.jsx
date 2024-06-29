import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Carouseler from './Carouseler'
import { Container } from 'react-bootstrap'
import Home from './Home'
import { useLocation } from 'react-router-dom'
import ProductPage from './ProductPage'

export default function UserPage() {
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <>
    <Header/> <br />
    <Container>
    {currentUrl === "/SWP391-MomAndBaby" ? <Home/> : <></>}
    {currentUrl === "/SWP391-MomAndBaby/" ? <Home/> : <></>}
    {currentUrl === "/SWP391-MomAndBaby/product" ? <ProductPage/> : <></>}
    </Container><br />
    <Footer/>
    </>
  )
}
