import { useState } from "react";
import { complaintMap } from "../data/complaintMap"; // keywords mapped to complaint type

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});

  const handleSearch = () => {
    const query = input.toLowerCase().trim();
    if (!query) {
      setResults({});
      return;
    }

    const groupedResults = {};

    // Loop through all keywords in complaintMap
    for (const keyword in complaintMap) {
      if (keyword.includes(query)) { // ✅ partial match allowed
        const type = complaintMap[keyword];
        if (!groupedResults[type]) {
          groupedResults[type] = [];
        }
        groupedResults[type].push(keyword);
      }
    }

    // If nothing matches
    if (Object.keys(groupedResults).length === 0) {
      groupedResults["Others - Miscellaneous"] = [query];
    }

    setResults(groupedResults);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Complaint Type Search</h1>

      {/* Input Box */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type keyword..."
        style={{ padding: "8px", width: "300px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "8px 12px",
          marginLeft: "10px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {/* Search Results */}
      <div style={{ marginTop: "20px" }}>
        {Object.keys(results).length > 0 ? (
          Object.entries(results).map(([type, keywords]) => (
            <div key={type} style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "blue" }}>{type}</h3>
              <ul>
                {keywords.map((kw, i) => (
                  <li key={i}>{kw}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "20px" }}>No results found.</p>
        )}
      </div>
    </div>
  );
}
