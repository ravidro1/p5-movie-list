import React, { useEffect, useRef, useState } from "react";

export default function MultiSelect({
  title = "Title",
  style,
  onchange,
  options,
  values,
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectRef = useRef();
  const selectSize = selectRef?.current?.getBoundingClientRect();

  useEffect(() => {
    if (Array.isArray(options) && checkIfDuplicateExists(options))
      throw new Error("The Options Array Must Be Unique");
  }, []);

  const checkIfDuplicateExists = (arr) => {
    return new Set(arr).size !== arr.length;
  };

  return (
    <div style={{ position: "relative", color: style?.color }} className="">
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
          {values?.length > 0 ? values?.toString() : title}
        </p>
      </div>

      {isSelectOpen && (
        <div
          className="rounded"
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            width: "100%",
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
                    if (values?.includes(option)) {
                      onchange(values?.filter((item) => item != option));
                    } else {
                      if (!Array.isArray(values)) {
                        onchange([option]);
                      } else {
                        if (typeof onchange == "function")
                          onchange([...values, option]);
                      }
                      // else setCheckedIndexes([...values, option]);
                    }
                  }}
                >
                  <input
                    checked={values?.includes(option)}
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
