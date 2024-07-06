import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Modal, Form, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  discount: Yup.number()
    .required('Discount is required')
    .min(10000, 'Discount must be greater than 10000'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be greater than 0')
});

export default function Voucher() {
  const baseURLVoucher = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher";
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVoucherApi();
  }, []);

  const fetchVoucherApi = () => {
    fetch(baseURLVoucher)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({ ...item, selected: false }));
        setData(updatedData);
      })
      .catch((error) => console.log(error));
  };

  const handleSelectAll = () => {
    const updatedData = data.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setData(updatedData);
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index) => {
    const updatedData = [...data];
    updatedData[index].selected = !updatedData[index].selected;
    setData(updatedData);
  };

  const handleDeleteVoucher = (id) => {
    setShowDeleteConfirmation(true);
    setDataToDelete([id]);
  };

  const handleDeleteAllChecked = () => {
    const selectedIds = data.filter((item) => item.selected).map((item) => item.id);

    if (selectedIds.length === 0) {
      toast.error("Please select at least one voucher to delete");
      return;
    }

    setDataToDelete(selectedIds);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmedDelete = () => {
    Promise.all(
      dataToDelete.map((id) =>
        fetch(`${baseURLVoucher}/${id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => {
        fetchVoucherApi();
        setShowDeleteConfirmation(false);
        toast.success("Vouchers deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete vouchers");
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (event) => {
    setEntriesToShow(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const filteredData = data.filter((voucher) =>
    voucher.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const displayedData = filteredData.slice(startIndex, endIndex).map((voucher) => ({
    ...voucher,
    formattedExpiration: new Date(voucher.expiration).toLocaleDateString()
  }));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowUpdateModal(true);
  };

  const handleSubmitUpdate = (values) => {
    fetch(`${baseURLVoucher}/${selectedVoucher.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...selectedVoucher,
        discount: values.discount,
        quantity: values.quantity,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchVoucherApi();
        setShowUpdateModal(false);
        toast.success('Voucher updated successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to update voucher');
      });
  };

  return (
    <div className="voucher-table-wrapper">
      <div style={{ background: "white", borderRadius: "5px" }}>
        <Row
          style={{
            padding: "5px 10px",
            textAlign: "center",
            borderBottom: "1px solid #ff469e",
            margin: "0px 20px",
          }}
        >
          <h1 className="Header">Voucher</h1>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Button
            variant="danger"
            style={{
              width: 125,
              fontSize: 12,
              padding: "5px 10px",
              lineHeight: 1.5,
              marginLeft: 40,
            }}
            onClick={handleDeleteAllChecked}
          >
            Delete all checked
          </Button>
        </Row>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 5,
          }}
        >
          <span style={{ width: "73%" }}>
            <b>
              Show{" "}
              <Form.Select
                style={{ display: "inline", width: 70, height: 40, margin: 2 }}
                aria-label=""
                value={entriesToShow}
                onChange={handleEntriesChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </Form.Select>{" "}
              entries{" "}
            </b>
          </span>
          <span style={{ width: "27%" }}>
            <b>
              Search:{" "}
              <input
                style={{
                  padding: "3px 15px",
                  borderRadius: 5,
                  border: "1px solid #aaa",
                }}
                type="text"
                value={searchQuery}
                onChange={handleSearch}
              />
            </b>
          </span>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>#</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Expiration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((voucher, index) => (
              <tr key={voucher.id}>
                <td style={{ alignItems: "center" }}>
                  <Form.Check
                    type="checkbox"
                    checked={voucher.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{voucher.id}</td>
                <td>{voucher.code}</td>
                <td>{voucher.discount}</td>
                <td>{voucher.quantity}</td>
                <td>{voucher.formattedExpiration}</td> {/* Display formatted expiration */}
                <td>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "#5cb85c",
                      width: 30,
                      borderRadius: 100,
                      textAlign: "center",
                      margin: "0px 5px",
                    }}
                  >
                    {" "}
                    <Link
                      style={{ color: "white" }}
                      onClick={() => handleUpdateVoucher(voucher)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>{" "}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "orange",
                      width: 30,
                      borderRadius: 100,
                      textAlign: "center",
                      margin: "0px 5px",
                    }}
                  >
                    {" "}
                    <Link
                      style={{ color: "white" }}
                      onClick={() => handleDeleteVoucher(voucher.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the selected vouchers?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmedDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Voucher</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={{
              discount: selectedVoucher ? selectedVoucher.discount : '',
              quantity: selectedVoucher ? selectedVoucher.quantity : ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitUpdate}
            enableReinitialize
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>Discount</Form.Label>
                    <Form.Control style={{width: "90%"}}
                      type="number"
                      name="discount"
                      value={values.discount}
                      onChange={handleChange}
                      isInvalid={!!errors.discount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.discount}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control style={{width: "90%"}}
                      type="number"
                      name="quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      isInvalid={!!errors.quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.quantity}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
}
