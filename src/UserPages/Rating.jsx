import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export default function Rating({ productId }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const baseURLProduct = `https://66801b4556c2c76b495b2d81.mockapi.io/product/${productId}`;

  const handleClick = (index) => {
    setRating(index + 1); // +1 because index is zero-based
  };

  const handleSave = async () => {
    if (!rating || !userId) {
      alert("Please select a rating and ensure you are logged in.");
      return;
    }

    try {
      const response = await fetch(baseURLProduct);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const product = await response.json();

      const existingRatingIndex = product.rating.findIndex(r => r.userID === userId);
      let updatedRatings;

      if (existingRatingIndex !== -1) {
        // Update existing rating
        updatedRatings = product.rating.map((r, index) =>
          index === existingRatingIndex ? { ...r, rate: rating } : r
        );
      } else {
        // Add new rating
        updatedRatings = [...product.rating, { userID: userId, rate: rating }];
      }

      await fetch(baseURLProduct, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating: updatedRatings })
      });

      alert("Rating saved successfully!");
    } catch (error) {
      console.error("Error saving rating:", error);
      alert("Error saving rating. Please try again.");
    }
  };

  return (
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
      <Button variant="outline-primary" onClick={handleSave}>Save</Button>
    </div>
  );
}
