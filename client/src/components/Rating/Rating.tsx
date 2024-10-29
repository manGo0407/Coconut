import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ submitRating, averageRating, isAuth }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = (ratingValue) => {
    // Проверяем, что пользователь аутентифицирован, функция отправки
    // рейтинга задана, и что установка оценки разрешена
    if (isAuth && submitRating) {
      setRating(ratingValue);
      submitRating(ratingValue);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              color={
                ratingValue <= (hover || rating || averageRating)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              size={30}
              onMouseEnter={() => isAuth && setHover(ratingValue)}
              onMouseLeave={() => isAuth && setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
