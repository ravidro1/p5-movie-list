import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateOneRate,
  deleteOneRate,
} from "../Redux/Actions/OneRateAction";
import { Button } from "react-bootstrap";

export default function Rating({ rate, movieID, numberOfRate }) {
  const dispatch = useDispatch();
  const { token, userRates } = useSelector((state) => state.UserReducer);
  const isUserAlreadyRateThisMovie = userRates?.includes(movieID);

  const [hover, setHover] = useState({ isHover: false, hoverOn: null });
  const [hoverValue, setHoverValue] = useState(null);

  useEffect(() => {
    if (!hover.isHover) setHoverValue(rate);
  }, [hover, userRates, rate]);

  const createRate = async (rate) => {
    await dispatch(createOrUpdateOneRate({ movie_id: movieID, rate }));
  };

  const deleteRate = async () => {
    await dispatch(deleteOneRate({ movie_id: movieID }));
  };

  return (
    <>
      {token ? (
        <div
          className="d-flex flex-column justify-content-between"
          style={{ position: "relative" }}
        >
          {isUserAlreadyRateThisMovie && (
            <div className="d-flex justify-content-between flex-wrap my-3">
              <p>
                <strong>You Already Rate This Movie</strong>
              </p>
              <Button
                title="Delete Rate"
                style={{ borderRadius: "30%" }}
                onClick={deleteRate}
                variant="warning"
                className=""
              >
                <i className="fa-solid fa-minus" />
              </Button>
            </div>
          )}
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
                  const star = event.clientX - elementRect?.x;
                  const percentOfStar = Math.round(
                    (star / elementRect?.width) * 100
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
                        left:
                          leftRelativeToCard + elementRect?.width / 2 + "px",
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
                      onClick={() => createRate(hoverValue)}
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
                        aspectRatio: "1/1",
                      }}
                      className={
                        "rating-star " +
                        (thisStarValue >= 1
                          ? "fa-solid fa-star"
                          : thisStarValue >= 0.5
                          ? "fa-solid fa-star-half-stroke"
                          : "fa-regular fa-star")
                      }
                    />
                  </React.Fragment>
                );
              })}
          </section>
          <section className="d-flex flex-wrap mb-2">
            <p className="m-0">Rating &nbsp;</p>
            <strong> {String(rate)?.substring(0, 5)} &nbsp;</strong>
            <p className="m-0"> Out Of &nbsp;</p>
            <strong>{numberOfRate}</strong> &nbsp;
            <p className="m-0">Ratings</p>
          </section>
        </div>
      ) : (
        <div
          className="d-flex flex-column justify-content-between"
          style={{ position: "relative" }}
        >
          <section className="d-flex">
            {Array(5)
              .fill(0)
              .map((_, index) => {
                const thisStarValue = rate - index;
                return (
                  <React.Fragment key={index}>
                    <i
                      id={`rating-star-index${index}+movieID${movieID}`}
                      style={{
                        color: "#f8e825",
                        aspectRatio: "1/1",
                      }}
                      className={
                        "rating-star " +
                        (thisStarValue >= 1
                          ? "fa-solid fa-star"
                          : thisStarValue >= 0.5
                          ? "fa-solid fa-star-half-stroke"
                          : "fa-regular fa-star")
                      }
                    />
                  </React.Fragment>
                );
              })}
          </section>
          <section className="d-flex flex-wrap mb-2">
            <p className="m-0">Rating &nbsp;</p>
            <strong> {String(rate)?.substring(0, 5)} &nbsp;</strong>
            <p className="m-0"> Out Of &nbsp;</p>
            <strong>{numberOfRate}</strong> &nbsp;
            <p className="m-0">Ratings</p>
          </section>
        </div>
      )}
    </>
  );
}
