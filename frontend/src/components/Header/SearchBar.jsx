import { useState } from "react";
import axios from "axios";

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
    <div className="relative flex items-center w-80 sm:w-52">
      
      {/* Input */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-yellow-500 bg-[#1b1b1b] text-white text-base outline-none focus:border-yellow-500 focus:shadow-[0_0_10px_#f7b500] transition-all duration-300"
      />

      {/* Search Icon */}
      <span className="absolute left-3 text-yellow-500 text-xl pointer-events-none">
        🔍
      </span>

      {/* Dropdown Results */}
      {results.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-[#111] rounded-lg max-h-56 overflow-y-auto shadow-lg z-50">
          {results.map((item, i) => (
            <li
              key={i}
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

export default SearchBar;