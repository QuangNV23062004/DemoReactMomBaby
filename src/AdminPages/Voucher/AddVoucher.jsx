import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";

export default function AddVoucher() {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    quantity: "",
    expiration: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (value) => {
    setFormData({
      ...formData,
      expiration: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation or other logic before submitting

    // Example: Submitting data to your API
    fetch("https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Voucher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Voucher added successfully:", data);
        // Optionally, reset form state or show a success message
      })
      .catch((error) => {
        console.error("Error adding voucher:", error);
        // Handle errors
      });
  };

  return (
    <div>
      <h2>Add New Voucher</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-0" controlId="code">
          <Form.Label>Voucher Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter voucher code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-0" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount percentage"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-0" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity available"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-0" controlId="expiration">
          <Form.Label>Expiration Date</Form.Label>
          <DatePicker
            value={formData.expiration}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            clearIcon={null}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Voucher
        </Button>
      </Form>
    </div>
  );
}
