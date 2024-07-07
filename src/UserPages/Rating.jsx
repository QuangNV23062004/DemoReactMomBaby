import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function Rating({ productId }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [fullName, setFullName] = useState("");
  const userId = sessionStorage.getItem('userId');
  const baseURLProduct = `https://66801b4556c2c76b495b2d81.mockapi.io/product/${productId}`;
  const baseURLAccount = `https://66801b4556c2c76b495b2d81.mockapi.io/Account/${userId}`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(baseURLProduct);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const product = await response.json();
        const userRating = product.rating.find(r => r.userID === userId);
        const userFeedback = product.feedback.find(f => f.userID === userId);

        if (userRating) {
          setRating(userRating.rate);
        }
        if (userFeedback) {
          setFeedback(userFeedback.text);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchAccount = async () => {
      try {
        const response = await fetch(baseURLAccount);
        if (!response.ok) {
          throw new Error('Account not found');
        }
        const account = await response.json();
        setFullName(account.fullname);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchProduct();
    fetchAccount();
  }, [baseURLProduct, baseURLAccount, userId]);

  const handleClick = (index) => {
    setRating(index + 1); // +1 because index is zero-based
  };

  const handleSave = async () => {
    if (!rating || !feedback || !userId) {
      alert("Please provide both rating and feedback, and ensure you are logged in.");
      return;
    }

    try {
      const response = await fetch(baseURLProduct);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const product = await response.json();

      const existingRatingIndex = product.rating.findIndex(r => r.userID === userId);
      const existingFeedbackIndex = product.feedback.findIndex(f => f.userID === userId);
      let updatedRatings;
      let updatedFeedbacks;

      if (existingRatingIndex !== -1) {
        // Update existing rating
        updatedRatings = product.rating.map((r, index) =>
          index === existingRatingIndex ? { ...r, rate: rating } : r
        );
      } else {
        // Add new rating
        updatedRatings = [...product.rating, { userID: userId, rate: rating }];
      }

      if (existingFeedbackIndex !== -1) {
        // Update existing feedback
        updatedFeedbacks = product.feedback.map((f, index) =>
          index === existingFeedbackIndex ? { ...f, text: feedback, fullName } : f
        );
      } else {
        // Add new feedback
        updatedFeedbacks = [...product.feedback, { userID: userId, text: feedback, fullName }];
      }

      await fetch(baseURLProduct, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating: updatedRatings, feedback: updatedFeedbacks })
      });

      alert("Rating and feedback saved successfully!");
    } catch (error) {
      console.error("Error saving rating and feedback:", error);
      alert("Error saving rating and feedback. Please try again.");
    }
  };

  return (
    <div>
      <div>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => handleClick(index)}
                style={{ display: "none" }}
              />
              <FaStar
                style={{ cursor: "pointer" }}
                size={30}
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <Form.Group controlId="feedback">
        <Form.Label>Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </Form.Group>
      <Button variant="outline-primary" onClick={handleSave}>Save</Button>
    </div>
  );
}
