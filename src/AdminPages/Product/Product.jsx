import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Product() {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [dataToDelete, setDataToDelete] = useState([]); // Store the IDs of items to delete
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const baseURL = "https://66801b4556c2c76b495b2d81.mockapi.io/product/";

  const fetchApi = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        // Add a 'selected' property to each item for checkbox control
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

    setDataToDelete(selectedIds); // Store the selected IDs for deletion
    setShowDeleteConfirmation(true); // Show confirmation modal
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
        fetchApi(); // Refresh data after deletion
        setShowDeleteConfirmation(false); // Hide confirmation modal
        toast.success("Accounts deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete products");
      });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((pro) =>
    pro.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category-table-wrapper">
      <div style={{ background: "white"}}>
        <Row
          style={{
            padding: "5px 10px",
            textAlign: "center",
            borderBottom: "1px solid #ff469e",
            margin: "0px 20px",
          }}
        >
          <h1 className="Header">Product</h1>
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
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
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
                  color: "black",
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
              <th>Product name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Sold</th>
              <th>Category</th>
              <th>Producer</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((pro, index) => (
              <tr key={pro.id}>
                <td style={{ alignItems: "center" }}>
                  <Form.Check
                    type="checkbox"
                    checked={pro.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>

                <td>{pro.name}</td>
                <td>{pro.price}</td>
                <td><span style={{width:50}}>{pro.mainImg}</span></td>
                <td>{pro.quantity}</td>
                <td>{pro.sold}</td>
                <td>{pro.category}</td>
                <td>{pro.producer}</td>
                <td>{pro.brand}</td>
     
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
                      to={`/SWP391-MomAndBaby/admin/product/update/${pro.id}`}
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
                    <Link style={{ color: "white" }} onClick={() => handleDeleteAcc(pro.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Confirmation Modal for Delete */}
        <Modal
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete the selected products?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmedDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toast Container for notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}
