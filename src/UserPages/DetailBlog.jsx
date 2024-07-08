import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DetailBlog() {
    const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product";
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogPost, setBlogPost] = useState(null);
    const [priorityOneData, setPriorityOneData] = useState([]);

    useEffect(() => {
        fetchBlogPost();
        fetchPriorityOneData();
    }, []);

    const fetchBlogPost = async () => {
        try {
            const response = await fetch(`https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBlogPost(data);
        } catch (error) {
            console.error('Error fetching blog post:', error);
        }
    };

    const fetchPriorityOneData = async () => {
        try {
            const response = await fetch(baseURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPriorityOneData(data.filter(product => product.priority === 1));
        } catch (error) {
            console.error('Error fetching priority one data:', error);
        }
    };

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
            key={product.id}
            onMouseEnter={() => handleMouseEnter(index, setState)}
            onMouseLeave={() => handleMouseLeave(index, setState)}
            style={{ position: 'relative' }}
        >
            <Card sx={{ maxWidth: 345, position: 'relative' }}>
                <div style={{ position: 'relative' }}>
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
                            {product.quantity > 0 ? (
                                <button
                                    style={{
                                        backgroundColor: '#ff469e',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px 20px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <button
                                    style={{
                                        backgroundColor: '#ff469e',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px 20px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handlePreorder(product)}
                                >
                                    Preorder
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
                        <Link to={`/SWP391-MomAndBaby/product/detail/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {product.name}
                        </Link>
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

    if (!blogPost) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-white ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a style={{ color: '#ff469e', fontSize: '28px' }} className="navbar-brand" href="/SWP391-MomAndBaby">Mom And Baby</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><a href="/SWP391-MomAndBaby" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="/SWP391-MomAndBaby/blog" className="nav-link">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            
            <div

                className="hero-wrap hero-bread"
                style={{
                    backgroundImage: `url('${blogPost.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    height: '800px',
                }}
            >
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 ftco-animate text-center" style={{ color: '#333' }}>
                            <p style={{ marginTop: '60px' }} className="breadcrumbs">
                                <span className="mr-2">
                                    <a href="/SWP391-MomAndBaby" style={{ color: '#', fontSize: '30px', marginRight: '20px' }}>Home</a>
                                </span>
                                <span style={{ color: '#', fontSize: '30px' }}>Blog</span>
                            </p>
                            <h1 style={{ fontSize: '60px', marginTop: '250px' }} className="mb-0 bread">{blogPost.title}</h1>
                            <h3>{blogPost.shortDesc}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate(-1)}
                style={{
                    backgroundColor: '#ff469e',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                    marginLeft: '10px'
                }}
            >
                Back to Blog
            </button>
            <div className="container mt-4">
                <Row>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
                        <div style={{ marginLeft: 10, color: "#db4444" }}>BLOG RELATED PRODUCT</div>
                    </div>
                </Row>
                <br />
                <Carousel responsive={responsive}>
                    {priorityOneData.map((product, index) => (
                        renderProductCard(product, index, setPriorityOneData)
                    ))}
                </Carousel>
                <Row>
                    <div className="col-md-12 text-center" style={{ marginTop: "55px" }}>
                        <Link to={'/SWP391-MomAndBaby/product'}>
                            View More Products
                        </Link>
                    </div>
                </Row>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="blog-post">
                            <h2 className="mb-2">{blogPost.title}</h2>
                            <p style={{ fontSize: '30px' }}>{blogPost.shortDesc}</p>
                            <p style={{ fontSize: '30px' }}>{blogPost.detailBlog}</p>
                        </div>
                    </div>
                </div>
            </div>
           
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#ff469e',
                    color: '#fff',
                    padding: '20px 40px',
                    borderRadius: '30px',
                    zIndex: '1000',
                    cursor: 'pointer',
                }}
            >
                <a
                    href="https://m.me/343721882163379"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                    <FontAwesomeIcon icon={faFacebookMessenger} style={{ marginRight: '10px' }} />
                    Chat
                </a>
            </div>
            <Footer />
        </div>
    );
}
