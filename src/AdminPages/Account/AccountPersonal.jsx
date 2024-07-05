import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const styles = {
    formGroup: {
        marginBottom: '1rem',
    },
    label: {
        fontWeight: 'bold',
    },
    formControl: {
        backgroundColor: '#f8f9fa',
    },
    profileContainer: {
        backgroundColor: '#e9ecef',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    header: {
        marginBottom: '2rem',
        textAlign: 'center',
    },
    avatar: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '1rem',
    },
};

const PersonalPage = () => {
    const [account, setAccount] = useState({
        avatar: '',
        fullname: '',
        email: '',
        phone: '',
        username: '',
    });

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const loggedInUser = JSON.parse(sessionStorage.getItem('adminUser'));
                if (loggedInUser && loggedInUser.id) {
                    const response = await axios.get(`https://66801b4556c2c76b495b2d81.mockapi.io/Account/${loggedInUser.id}`);
                    setAccount(response.data);
                } else {
                    console.error('No logged-in user found in sessionStorage');
                }
            } catch (error) {
                console.error('Error fetching account details:', error);
            }
        };

        fetchAccountDetails();
    }, []);

    return (
        <Container style={styles.profileContainer}>
            <h2 style={styles.header}>Personal Information</h2>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="text-center">
                        <img src={account.avatar} alt="Avatar" style={styles.avatar} />
                    </div>
                    <Form>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label style={styles.label}>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={account.fullname}
                                readOnly
                                style={styles.formControl}
                            />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label style={styles.label}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={account.email}
                                readOnly
                                style={styles.formControl}
                            />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label style={styles.label}>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={account.phone}
                                readOnly
                                style={styles.formControl}
                            />
                        </Form.Group>
                        <Form.Group style={styles.formGroup}>
                            <Form.Label style={styles.label}>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={account.username}
                                readOnly
                                style={styles.formControl}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PersonalPage;
