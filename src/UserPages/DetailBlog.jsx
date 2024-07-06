import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

export default function DetailBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blogPost, setBlogPost] = useState(null);

    useEffect(() => {
        fetchBlogPost();
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
                                marginLeft:'10px'
                            }}
                        >
                            Back to Blog
                        </button>
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
