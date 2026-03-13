import { useState } from "react";

function FooterSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Dummy data
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
    <div className="relative flex items-center w-80 mt-2 md:w-64">
      {/* Input */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-yellow-500 bg-[#1b1b1b] text-white text-base outline-none focus:border-yellow-500 focus:shadow-[0_0_10px_#f7b500] transition-all duration-300"
      />

      {/* Search icon */}
      <span className="absolute left-3 text-yellow-500 text-xl pointer-events-none">&#128269;</span>

      {/* Dropdown */}
      {results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-[#111] rounded-lg max-h-56 overflow-y-auto shadow-lg mt-1 z-50">
          {results.map((item, index) => (
            <li
              key={index}
              className="px-4 py-3 cursor-pointer border-b border-gray-800 hover:bg-yellow-500 hover:text-black transition-all duration-200"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FooterSearchBar;