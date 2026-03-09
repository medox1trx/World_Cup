import { useState } from "react";
import axios from "axios";
import "./SearchBar.css"; // include CSS

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/search?q=${value}`
        );
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="searchbar">
      {/* Input field */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />

      {/* Search icon */}
      <span className="search-icon">&#128269;</span>

      {/* Dropdown results */}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;