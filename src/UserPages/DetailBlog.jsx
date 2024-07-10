import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
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
    const [linkedProduct, setLinkedProduct] = useState(null);

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
            fetchLinkedProduct(data.productID);
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

    const fetchLinkedProduct = async (productID) => {
        try {
            const response = await fetch(`${baseURL}/${productID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLinkedProduct(data);
        } catch (error) {
            console.error('Error fetching linked product:', error);
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
                    <Link style={{ color: '#ff469e', fontSize: '28px' }} className="navbar-brand" to="/SWP391-MomAndBaby">Mom And Baby</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/SWP391-MomAndBaby" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/SWP391-MomAndBaby/blog" className="nav-link">Blog</Link></li>
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
                                    <Link href="/SWP391-MomAndBaby" style={{ color: '#', fontSize: '30px', marginRight: '20px' }}>Home</Link>
                                </span>
                                <span style={{ color: '#', fontSize: '30px' }}>Blog</span>
                            </p>
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
                    <Col md={8}>
                        <div className="blog-post card shadow-sm" style={{ borderRadius: '15px', overflow: 'hidden', marginBottom: '20px', border: '1px solid #ddd' }}>
                            <div className="card-body" style={{ padding: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
                                <h2 className="card-title mb-3" style={{ fontSize: '28px', fontWeight: 'bold', color: '#343a40', textTransform: 'uppercase', letterSpacing: '1px' }}>{blogPost.title}</h2>
                                <h4 className="card-subtitle mb-3 text-muted" style={{ fontSize: '20px', marginBottom: '20px', fontStyle: 'italic', color: '#6c757d' }}>{blogPost.shortDesc}</h4>
                                <div className="card-text" style={{ fontSize: '18px', lineHeight: '1.8', color: '#495057' }} dangerouslySetInnerHTML={{ __html: blogPost.detailBlog }} />
                            </div>
                        </div>
                    </Col>
                    {linkedProduct && (
                        <Col md={4}>
                            <Row>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
                        <div style={{ marginLeft: 10, color: "#db4444" }}>BLOG RELATED PRODUCT</div>
                    </div>
                </Row>
                            <Card sx={{ maxWidth: 345, position: 'relative' }}>
                                <div style={{ position: 'relative' }}>
                                    <CardMedia sx={{ height: 400 }} image={linkedProduct.mainImg} />
                                </div>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" style={{ height: 120, marginTop: 30 }}>
                                        <Link to={`/SWP391-MomAndBaby/product/detail/${linkedProduct.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {linkedProduct.name}
                                        </Link>
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "left", marginLeft: 10, color: "#d10024" }}>
                                        <b>{linkedProduct.price} VNĐ</b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    )}
                </Row>
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

            <div className="container mt-4">
                <Row>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "15px", height: "100%", backgroundColor: "red" }}>|</div>
                        <div style={{ marginLeft: 10, color: "#db4444" }}>OTHER PRODUCT</div>
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
            <Footer />
        </div>
    );
}
