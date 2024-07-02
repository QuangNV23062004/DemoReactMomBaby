import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
    barWithProfile: {
        display: 'flex',
        width: '100%',
    },
    logo: {
        backgroundColor: 'white',
        display: 'inline',
        margin: 0,
        padding: 0,
    },
    smallLogo: {
        width: '50%',
    },
    userContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#c1e3e1',
    },
    user: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8b5c7e',
        width: '10%',
        borderRadius: '25px',
        paddingRight: '15px',
        marginRight: '20px',
        transition: 'background-color 0.3s',
        position: 'relative', // Ensure dropdown position is relative to this element
        cursor: 'pointer', // Change cursor to pointer on hover
    },
    userHover: {
        backgroundColor: '#fa9fa4',
    },
    smallUser: {
        width: '50%',
        height: 'auto',
        borderRadius: '50px',
        padding: 0,
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: '#fff',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        zIndex: 10, // Ensure dropdown is above other content
        minWidth: '150px',
        display: 'none',
    },
    dropdownContent: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    },
};

export default function Header() {
    const [userHovered, setUserHovered] = useState(false);
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('adminUser'));
        if (loggedInUser) {
            setFullName(loggedInUser.fullname);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('adminUser'); // Remove user from sessionStorage
        navigate('/SWP391-MomAndBaby/admin/login'); // Redirect to login page
    };

    const toggleDropdown = () => {
        setUserHovered(!userHovered);
    };

    return (
        <>
            <Row style={styles.barWithProfile}>
                <Col md={2} style={styles.logo}>
                    <img src="../../assets/logo.jpg" style={styles.smallLogo} alt="Logo" />
                </Col>
                <Col md={10} style={styles.userContainer}>
                    <div
                        style={{
                            ...styles.user,
                            ...(userHovered ? styles.userHover : {}),
                        }}
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={toggleDropdown}
                    >
                        <img src="../../assets/default_avatar.jpg" style={styles.smallUser} alt="User" />
                        <span style={{ marginLeft: '10px', cursor: 'pointer' }}>{fullName.split(' ').pop()} &#9662;</span>
                        {userHovered && (
                            <div style={{ ...styles.dropdown, display: 'block' }}>
                                <div style={styles.dropdownContent} onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
}
