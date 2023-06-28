import React, { useEffect, useState } from "react";

export default function Rating({ rate, movieID, numberOfRate, size = "40px" }) {
  const [hover, setHover] = useState({ isHover: false, hoverOn: null });
  const [hoverValue, setHoverValue] = useState(null);

  useEffect(() => {
    if (!hover.isHover) setHoverValue(rate);
  }, [hover]);

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ position: "relative" }}
    >
      <section className="d-flex">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const thisStarValue = hoverValue - index;

            const element = document.getElementById(
              `rating-star-index${index}+movieID${movieID}`
            );

            const elementRect = element?.getBoundingClientRect();

            const topRelativeToCard = element?.offsetTop;
            const leftRelativeToCard = element?.offsetLeft;

            const mouseListen = (event) => {
              const star = event.clientX - elementRect.x;
              const percentOfStar = Math.round(
                (star / elementRect.width) * 100
              );

              if (percentOfStar >= 70) setHoverValue(index + 1);
              else if (percentOfStar >= 30) setHoverValue(index + 0.5);
              else setHoverValue(index);
            };

            return (
              <React.Fragment key={index}>
                <div
                  className="rounded"
                  style={{
                    display:
                      hover.isHover && hover.hoverOn == index
                        ? "block"
                        : "none",
                    position: "absolute",
                    width: "fit-content",
                    height: "40px",
                    left: leftRelativeToCard + elementRect?.width / 2 + "px",
                    top: topRelativeToCard + "px",
                    transform: "translate(-50%,-120%)",
                    backgroundColor: "#0c0c0ca3",
                    color: "#fff",
                    padding: "10px 50px",
                    fontWeight: "bold",
                  }}
                >
                  {hoverValue}
                </div>
                <i
                  id={`rating-star-index${index}+movieID${movieID}`}
                  onMouseEnter={(e) =>
                    setHover({ isHover: true, hoverOn: index })
                  }
                  onMouseLeave={(e) =>
                    setHover({ isHover: false, hoverOn: null })
                  }
                  onMouseMove={(e) => mouseListen(e)}
                  style={{
                    color: "#f8e825",
                    fontSize: size,
                    width: `calc(${size} + ${size}/4)`,
                    aspectRatio: "1/1",
                  }}
                  className={
                    // "fa-2xl " +
                    thisStarValue >= 1
                      ? "fa-solid fa-star"
                      : thisStarValue >= 0.5
                      ? "fa-solid fa-star-half-stroke"
                      : "fa-regular fa-star"
                  }
                />
              </React.Fragment>
            );
          })}
      </section>
      <p className="d-flex">
        Rating &nbsp; <strong> {String(rate)?.substring(0, 5)}</strong> &nbsp;
        Out Of &nbsp;
        <strong>{numberOfRate}</strong> &nbsp; Ratings
      </p>
    </div>
  );
}
