import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Modal, Form, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Voucher() {
  const baseURLVoucher = "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher";
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [dataToDelete, setDataToDelete] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchVoucherApi = () => {
    fetch(baseURLVoucher)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({ ...item, selected: false }));
        setData(updatedData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchVoucherApi();
  }, []);

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

  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / entriesToShow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                <td>{voucher.used.join(', ')}</td>
                <td>{voucher.expiration}</td>
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
                      to={`/SWP391-MomAndBaby/admin/voucher/update/${voucher.id}`}
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

        <ToastContainer />
      </div>
    </div>
  );
}
