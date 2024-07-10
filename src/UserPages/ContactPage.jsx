import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactForm = () => {
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Please enter information for this field'),
            email: Yup.string().email('Email invalid').required('Please enter information for this field'),
            phone: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Phone invalid').required('Please enter information for this field'),
            message: Yup.string().required('Please enter information for this field'),
        }),
        onSubmit: values => {
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <>
            <Header />
            {/* BREADCRUMB */}
            <div id="breadcrumb" className="section">
                <div className="container">
                    <div className="row" style={{ background: 'transparent' }}>
                        <div className="col-md-12">
                            <ul className="breadcrumb-tree" style={{ listStyleType: 'none', display: 'flex', padding: 0, alignItems: 'center' }}>
                                <li style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                                    <Link to="/SWP391-MomAndBaby" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Home</Link>
                                    <span style={{ marginLeft: '10px', marginRight: '10px', color: '#6c757d' }}>/</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <Link to="/SWP391-MomAndBaby/contact" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* /BREADCRUMB */}

            {/* Section */}
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="order-summary" style={summaryStyle}>
                                <div className="product-btns" style={{ marginBottom: '20px' }}>
                                    <button className="btn-round">
                                        <PhoneIcon fontSize="large" />
                                    </button>
                                    <label style={{ marginLeft: '15px' }}>CALL TO US</label>
                                </div>
                                <div>
                                    <p>We are available from Monday to Saturday, from 9:00 AM to 10:00 PM</p>
                                    <p>Phone: 0949204801</p>
                                </div>
                                <div className="product-btns" style={buttonStyle}>
                                    <button className="btn-round" style={{ marginTop: '20px' }}>
                                        <EmailIcon fontSize="large" />
                                    </button>
                                    <label style={{ marginLeft: '15px' }}>WRITE TO US</label>
                                </div>
                                <div>
                                    <p>If you need any help please fill out the contact form and we will get back to you as soon as we can.</p>
                                    <p>Email: momandbabies.company@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="order-summary" style={summaryStyle}>
                                    <div className="row" style={{ backgroundColor: 'lightblue' }}>
                                        <div className="col-md-4 form-group">
                                            <input
                                                id="fullname"
                                                className="input"
                                                type="text"
                                                name="fullname"
                                                style={{ backgroundColor: 'white', color: 'black' }}
                                                placeholder="Your Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.fullname}
                                            />
                                            {formik.touched.fullname && formik.errors.fullname ? (
                                                <span className="message_error">{formik.errors.fullname}</span>
                                            ) : null}
                                        </div>
                                        <div className="col-md-4 form-group">
                                            <input
                                                id="email"
                                                className="input"
                                                type="email"
                                                name="email"
                                                style={{ backgroundColor: 'white', color: 'black' }}
                                                placeholder="Email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <span className="message_error">{formik.errors.email}</span>
                                            ) : null}
                                        </div>
                                        <div className="col-md-4 form-group">
                                            <input
                                                id="phone"
                                                className="input"
                                                type="tel"
                                                name="phone"
                                                style={{ backgroundColor: 'white', color: 'black' }}
                                                placeholder="Phone number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />
                                            {formik.touched.phone && formik.errors.phone ? (
                                                <span className="message_error">{formik.errors.phone}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            id="message"
                                            className="input"
                                            name="message"
                                            placeholder="Your Message"
                                            style={{ height: '150px', resize: 'none', width: '100%' }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.message}
                                        ></textarea>
                                        {formik.touched.message && formik.errors.message ? (
                                            <span className="message_error">{formik.errors.message}</span>
                                        ) : null}
                                    </div>
                                    <div className="text-right" style={{ marginTop: '40px', marginBottom: '9px' }}>
                                        <button
                                            id="sendMessage"
                                            name="btn-send-message"
                                            className="btn btn-default"
                                            type="submit"
                                            style={{
                                                padding: '10px',
                                                color: '#fff',
                                                backgroundColor: '#db4444',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

const summaryStyle = {
    border: '1px solid #ed495c',
    padding: '20px',
    marginBottom: '60px',
    borderRadius: '10px',
    backgroundColor: 'lightblue',
};

const buttonStyle = {
    borderTop: '1px solid #ed495c',
    marginTop: '20px',
    marginBottom: '20px',
};

export default ContactForm;