import React, { useEffect, useState } from "react";

export default function Rating({ rate }) {
  const [isHover, setIsHover] = useState(false);
  const [hoverValue, setHoverValue] = useState(null);

  console.log(hoverValue);

  useEffect(() => {
    if (!isHover) setHoverValue(rate);
  }, [isHover]);
  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {Array(5)
        .fill(0)
        .map((_, index) => {
          // console.log(rate);
          const thisStarValue = hoverValue - index;

          return (
            <span
              onMouseEnter={() => {
                setHoverValue(index + 1);
              }}
              onMouseLeave={() => {
                setHoverValue(null);
              }}
              key={index}
            >
              <i
                style={{ color: "#f8e825", fontSize: "40px" }}
                className={
                  thisStarValue >= 1
                    ? "fa-solid fa-star"
                    : thisStarValue >= 0.5
                    ? "fa-solid fa-star-half-stroke"
                    : "fa-regular fa-star"
                }
              />
            </span>
          );
        })}
    </div>
  );
}
