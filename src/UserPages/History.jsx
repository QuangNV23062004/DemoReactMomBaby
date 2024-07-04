import React, { useEffect, useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Overlay from 'react-bootstrap/Overlay';

export default function History() {
  const baseURLBill = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill";
  const [Bill, setBill] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [detail, setDetail] = useState([]);

  const FetchBill = () => {
    fetch(baseURLBill)
      .then((res) => res.json())
      .then((data) => {
        const YourBill = data.filter((bill) => bill.userID === userId);
        setBill(YourBill);
        console.log(YourBill);
      })
      .catch((error) => console.log(error));
  };

  const nav = useNavigate();

  useEffect(() => {
    FetchBill();
  }, [userId]);

  const handleShowDetails = (details, event) => {
    setDetail(details);
    setTarget(event.target);
    setShow(!show);
  };

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Bill.map((bill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bill.name}</td>
              <td>{bill.phone}</td>
              <td>{bill.address}</td>
              <td>{bill.total}</td>
              <td>{bill.status}</td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={(event) => handleShowDetails(bill.detail, event)}
                >
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Overlay target={target} show={show} placement="left">
        {({
          placement,
          arrowProps,
          show: _show,
          popper,
          ...props
        }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '2px 10px',
              color: 'black',
              borderRadius: 3,
              ...props.style,
            }}
          >
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Product Image</th>
                </tr>
              </thead>
              <tbody>
                {detail.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td><img src={item.productImage} alt="Product" width="50" /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Overlay>
    </>
  );
}
