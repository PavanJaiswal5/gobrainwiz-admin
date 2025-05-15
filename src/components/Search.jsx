// components/Search.js
import React from 'react';

function Search({ onSearch }) {
  return (
    <div className="bw-search">
      <i className="fi fi-rr-search"></i>
      <input
        className="form-control bw-form-control"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
