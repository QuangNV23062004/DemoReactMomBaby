
import React from 'react';
import Header from './UserPages/Header/Header';
import Footer from './UserPages/Footer/Footer';

const NotFound = () => {
  return (
    <>
    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: "100px" }}>
        <div style={{display: 'flex', justifyContent: 'center'}}><img style={{width: '60%'}}src="https://whoops.ie/wp-content/uploads/2018/02/Whoops.ie-logo-01.png" alt="WHOOPS" /></div>
        <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
    
    </>
  );
};

export default NotFound;