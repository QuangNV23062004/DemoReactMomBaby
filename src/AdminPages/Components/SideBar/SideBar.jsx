import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-bootstrap';

const styles = {
  sideBar: {
    display: 'inline-block',
    backgroundColor: 'rgba(118, 155, 186, 0.78)',
    color: 'white',
    height: '100%',
    width: "234px",
  },
  sideButton: {
    padding: '18px 0 18px 25px',
    fontSize: '12px',
    fontFamily: 'Arial, Helvetica, sans-serif',
    textDecoration: 'none',
    display: 'block',
    transition: 'background 0.3s ease',
  },
  sideButtonHover: {
    background: 'rgba(40, 40, 46, 0.28)',
  },
  messageIcon: {
    marginRight: '10px',
  },
};

function SideBar() {
  const [hovered, setHovered] = React.useState(null);

  const handleHover = (index) => {
    setHovered(index);
  };

  const handleHoverExit = () => {
    setHovered(null);
  };

  return (
    <Col md={2} style={styles.sideBar}>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 0 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(0)}
        onMouseLeave={handleHoverExit}
      >
        <Link to='/SWP391-MomAndBaby/admin/account' style={{ ...styles.link, color: 'white' }}>
          Account
        </Link>
      </div>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 1 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(1)}
        onMouseLeave={handleHoverExit}
      >
        <Link to='/SWP391-MomAndBaby/admin/bill' style={{ ...styles.link, color: 'white' }}>
          Bill
        </Link>
      </div>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 2 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(2)}
        onMouseLeave={handleHoverExit}
      >
        <Link to='/SWP391-MomAndBaby/admin/blog' style={{ ...styles.link, color: 'white' }}>
          Blog
        </Link>
      </div>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 3 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(3)}
        onMouseLeave={handleHoverExit}
      >
        <div onClick={()=>window.open("https://www.messenger.com/?locale=vi_VN", '_blank', 'noopener,noreferrer')} style={{ ...styles.link, color: 'white' }}>
          <FontAwesomeIcon style={styles.messageIcon} icon={faMessage} />
          Go to chat
        </div>
      </div>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 4 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(4)}
        onMouseLeave={handleHoverExit}
      >
        <Link to='/SWP391-MomAndBaby/admin' style={{ ...styles.link, color: 'white' }}>
          Home
        </Link>
      </div>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 5 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(5)}
        onMouseLeave={handleHoverExit}
      >
        <Link to='/SWP391-MomAndBaby/admin/product' style={{ ...styles.link, color: 'white' }}>
          Product
        </Link>
      </div>
      <div
        style={{
          ...styles.sideButton,
          ...(hovered === 6 ? styles.sideButtonHover : {}),
        }}
        onMouseEnter={() => handleHover(6)}
        onMouseLeave={handleHoverExit}
      >
        <Link to='/SWP391-MomAndBaby/admin/voucher' style={{ ...styles.link, color: 'white' }}>
          Voucher
        </Link>
      </div>
    </Col>
  );
}

export default SideBar;
