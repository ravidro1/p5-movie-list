import React, { useEffect, useRef, useState } from "react";

export default function MultiSelect({
  title = "Title",
  style,
  onchange,
  options,
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const selectRef = useRef();
  const selectSize = selectRef?.current?.getBoundingClientRect();

  useEffect(() => {
    if (typeof onchange == "function")
      onchange(checkedIndexes?.map((item) => item.value));
  }, [checkedIndexes]);

  return (
    <div style={{ position: "relative" }} className="">
      <div
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        ref={selectRef}
        className="align-items-center px-3 d-flex"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          ...style,
        }}
      >
        <p
          className="m-0"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {checkedIndexes.length > 0
            ? checkedIndexes?.map((item) => item.value).toString()
            : title}
        </p>
      </div>

      {isSelectOpen && (
        <div
          className="rounded"
          style={{
            position: "absolute",
            // backgroundColor: "#cfcfcf",
            backgroundColor: "#fff",
            width: "100%",
            // height: "200px",
            left: 0,
            top: selectSize?.height + "px",
            zIndex: 10,
            maxHeight: selectSize?.height * 4 + "px",
            overflow: "auto",
            border: "1px solid #dee2e6",
          }}
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Item..."
            style={{
              border: "none",
              borderBottom: "1px solid #dee2e6",
              width: "100%",
              height: selectSize?.height,
            }}
            className="px-2"
          />
          {options?.map((option, index) => {
            if (option?.toLowerCase().includes(searchValue?.toLowerCase()))
              return (
                <div
                  key={index}
                  className="hover-multiSelect px-1 d-flex align-items-center"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: selectSize?.height * 0.75 + "px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                  onClick={() => {
                    if (checkedIndexes.some((item) => item.index == index)) {
                      setCheckedIndexes(
                        checkedIndexes.filter((item) => item.index != index)
                      );
                    } else {
                      setCheckedIndexes([
                        ...checkedIndexes,
                        { value: option, index },
                      ]);
                    }
                  }}
                >
                  <input
                    checked={checkedIndexes.some((item) => item.index == index)}
                    onChange={() => {}}
                    className="mx-2"
                    type="checkbox"
                  />
                  <p
                    style={{
                      marginBlock: "auto",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {option}
                  </p>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}
