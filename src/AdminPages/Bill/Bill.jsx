import React, { useEffect, useState } from 'react';
import { Button, Overlay, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Bill() {
  const baseURLBill = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill";
  const [bill, setBill] = useState([]);
  const [detail, setDetail] = useState([]);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const fetchBill = () => {
    fetch(baseURLBill)
      .then(res => res.json())
      .then(data => setBill(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchBill();
  }, []);

  const handleShowDetails = (details, event) => {
    setDetail(details);
    setTarget(event.target);
    setShow(!show);
  };

  const handleStatusChange = (billId, newStatus) => {
    setSelectedStatuses(prev => ({
      ...prev,
      [billId]: newStatus,
    }));
  };

  const handleUpdateStatus = (billId) => {
    const updatedStatus = selectedStatuses[billId];

    if (updatedStatus) {
      fetch(`${baseURLBill}/${billId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: updatedStatus }),
      })
        .then(res => res.json())
        .then(() => {
          toast.success('Bill status updated successfully!');
          fetchBill();
        })
        .catch(error => {
          toast.error('Failed to update bill status.');
          console.log(error);
        });
    }
  };

  const statusOptions = ["pending", "accepted", "delivery", "finished"];
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
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
            <th>Checkout date</th>
            <th>Total</th>
            <th>Detail</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {bill.map((bill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bill.name}</td>
              <td>{bill.phone}</td>
              <td>{bill.address}</td>
              <td>{formatDate(bill.checkoutDate)}</td>
              <td>{bill.total} VNĐ</td>
              
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={(event) => handleShowDetails(bill.detail, event)}
                >
                  Detail
                </Button>
              </td>
              <td>
                <Form.Select
                  aria-label="Select status"
                  value={selectedStatuses[bill.id] || bill.status}
                  onChange={(e) => handleStatusChange(bill.id, e.target.value)}
                >
                  <option>{bill.status}</option>
                  {statusOptions
                    .filter(status => status !== bill.status)
                    .map((status, idx) => (
                      <option key={idx} value={status}>{status}</option>
                    ))}
                </Form.Select>
              </td>
              <td>
                <Button variant='outline-success' onClick={() => handleUpdateStatus(bill.id)}><FontAwesomeIcon
                  icon={faPenToSquare}
                  
                /></Button>
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
      <ToastContainer />
    </>
  );
}
