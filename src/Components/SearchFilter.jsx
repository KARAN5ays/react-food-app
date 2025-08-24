import React from "react";

const SearchFilter = ({ filteredData, searchTerm }) => {
  // hide dropdown if no text typed
  if (!searchTerm.trim()) return null;

  return (
    <div
      className="dropdown position-absolute bg-white shadow rounded mt-5 w-100"
      style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
    >
      <ul className="list-unstyled m-0 p-2">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li
              key={item.id}
              className="d-flex align-items-center mb-2 p-1 rounded hover-bg-light"
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.Image}
                alt={item.Name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
                className="me-2"
              />
              <span>{item.Name}</span>
            </li>
          ))
        ) : (
          <li className="text-muted">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
