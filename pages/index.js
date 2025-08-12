import { useState } from "react";
import { complaintMap } from "../data/complaintMap"; // ✅ yahan se mapping import ho rahi hai

export default function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  // ✅ Ye wahi handleSearch function jo aapne bheja hai
  const handleSearch = () => {
    const query = input.toLowerCase().trim();
    if (!query) {
      setResults([]);
      return;
    }

    const matches = [];

    // complaintMap ke saare keywords check karo
    for (const keyword in complaintMap) {
      if (keyword.includes(query)) { // ✅ partial match allowed
        matches.push({
          keyword: keyword,
          type: complaintMap[keyword]
        });
      }
    }

    if (matches.length === 0) {
      // koi match nahi mila
      setResults([{ keyword: query, type: "Others - Miscellaneous" }]);
    } else {
      setResults(matches);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Complaint Search</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Type any keyword..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />

      <button
        onClick={handleSearch}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        Search
      </button>

      {/* Display Results */}
      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Matches:</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Issue Keyword</th>
                <th>Complaint Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, index) => (
                <tr key={index}>
                  <td>{res.keyword}</td>
                  <td>{res.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
