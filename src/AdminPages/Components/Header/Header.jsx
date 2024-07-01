import React from 'react';
import { Col, Row } from 'react-bootstrap';

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
};

export default function Header() {
  const [userHovered, setUserHovered] = React.useState(false);

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
            onMouseEnter={() => setUserHovered(true)}
            onMouseLeave={() => setUserHovered(false)}
          >
            <img src="../../assets/default_avatar.jpg" style={styles.smallUser} alt="User" />
            <span>Quang</span>
          </div>
        </Col>
      </Row>
    </>
  );
}
