import { useState } from "react";
import "./FooterSearchBar.css";

function FooterSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Dummy search data (replace with API if needed)
    const dummyData = [
      { name: "World Cup 2026" },
      { name: "FIFA Tournaments" },
      { name: "Tickets" },
      { name: "Teams" },
      { name: "Matches" },
    ];

    if (value.length > 0) {
      const filtered = dummyData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="footer-searchbar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />
      <span className="search-icon">&#128269;</span>

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FooterSearchBar;