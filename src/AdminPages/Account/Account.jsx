import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Modal, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [dataToDelete, setDataToDelete] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/Account";

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => ({ ...item, selected: false }));
        setData(updatedData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchApi();
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

  const handleDeleteAcc = (id) => {
    setShowDeleteConfirmation(true);
    setDataToDelete([id]);
  };

  const handleDeleteAllChecked = () => {
    const selectedIds = data.filter((item) => item.selected).map((item) => item.id);

    if (selectedIds.length === 0) {
      toast.error("Please select at least one account to delete");
      return;
    }

    setDataToDelete(selectedIds);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmedDelete = () => {
    Promise.all(
      dataToDelete.map((id) =>
        fetch(`${baseURL}/${id}`, {
          method: "DELETE",
        })
      )
    )
      .then(() => {
        fetchApi();
        setShowDeleteConfirmation(false);
        toast.success("Accounts deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete accounts");
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

  const filteredData = data.filter((acc) =>
    acc.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const displayedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / entriesToShow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="category-table-wrapper">
      <div style={{ background: "white", borderRadius:"5px"}}>
        <Row
          style={{
            padding: "5px 10px",
            textAlign: "center",
            borderBottom: "1px solid #ff469e",
            margin: "0px 20px",
          }}
        >
          <h1 className="Header">Account</h1>
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
                  color:"black",
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
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((acc, index) => (
              <tr key={acc.id}>
                <td style={{ alignItems: "center" }}>
                  <Form.Check
                    type="checkbox"
                    checked={acc.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{acc.id}</td>
                <td>{acc.fullname}</td>
                <td>{acc.email}</td>
                <td>{acc.phone}</td>
                <td>{acc.username}</td>
                <td>
                  <div
                    style={{
                      display: "inline-block",
                      color: "white",
                      backgroundColor: "#5cb85c",
                      width: "60px",
                      textAlign: "center",
                      borderRadius: 5,
                      fontSize: 13,
                    }}
                  >
                    {acc.role}
                  </div>
                </td>

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
                      to={`/SWP391-MomAndBaby/admin/account/update/${acc.id}`}
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
                    <Link style={{ color: "white" }} onClick={() => handleDeleteAcc(acc.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>
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
          <Modal.Body>Are you sure you want to delete the selected accounts?</Modal.Body>
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
