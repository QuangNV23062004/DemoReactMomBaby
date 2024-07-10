import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import axios from 'axios';

const BlogPersonal = ({ show, handleClose, blog }) => {
    const [productName, setProductName] = useState('');

    useEffect(() => {
        const fetchProductName = async () => {
            if (!blog.productID) {
                setProductName('No Product');
                return;
            }
            
            try {
                const productResponse = await axios.get(`https://66801b4556c2c76b495b2d81.mockapi.io/product/${blog.productID}`);
                const product = productResponse.data;
                if (product) {
                    setProductName(product.name);
                } else {
                    setProductName('No Product');
                }
            } catch (error) {
                console.error(error);
                setProductName('No Product');
            }
        };

        fetchProductName();
    }, [blog.productID]);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{blog.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="shortDesc">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={blog.shortDesc} />
                </Form.Group>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    {blog.image ? (
                        <Image src={blog.image} alt={blog.title} fluid />
                    ) : (
                        <p>No Image</p>
                    )}
                </Form.Group>
                <Form.Group controlId="detailBlog">
                    <Form.Label>Detailed Blog</Form.Label>
                    <Form.Control as="textarea" rows={5} readOnly defaultValue={blog.detailBlog} />
                </Form.Group>
                <Form.Group controlId="productID">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={productName} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BlogPersonal;
