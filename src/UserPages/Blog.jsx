import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import Footer from './Footer/Footer'
export default function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            const response = await fetch("https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBlogPosts(data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };

    return (
        <div>
            <div
                className="hero-wrap hero-bread"
                style={{
                    backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-taobao-pure-milk-promotion-carnival-poster-banner-background-image_153800.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    height: '190px'
                   
                }}
            >
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 ftco-animate text-center" style={{ color: '#333' }}>
                            <p className="breadcrumbs">
                                <span className="mr-2">
                                    <a href="/SWP391-MomAndBaby" style={{fontSize:'30px',
                                        marginRight:'20px'
                                        
                                        
                                    }}>Home</a>
                                </span>
                                <span style={{fontSize:'30px'}} >Blog</span>
                            </p>
                            <h1 style={{fontSize:'60px'}} className="mb-0 bread">Blog</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div

           
                 className="row">
                    {blogPosts.map(post => (
                        <div className="col-md-12 mb-4" key={post.id}>
                            <div className="row no-gutters">
                                {/* Image column */}
                                <div className="col-md-4">
                                    <img src={post.image} alt={post.title} width={350} className="img-fluid mb-3" />
                                </div>

                                {/* Description column */}
                                <div  className="col-md-8"
                                style={{  
                                   marginLeft:'-10px',
                                   fontSize:'20px'
                                    }} >

                                    <div className="blog-post">
                                        <h2 className="mb-2">{post.title}</h2>
                                        <p>{post.shortDesc}</p>
                                        <p>
                                            <a style={{  
                                                backgroundColor: '#ff469e', 
                                                borderRadius: '30px',
                                                borderColor:'#ff469e',
                                                padding:'18px 35px'
                                                }}    href="#" className="btn btn-primary">
                                                Read more
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


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
    <Footer/>
        </div>
    );
}