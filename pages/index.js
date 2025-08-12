import { useState } from "react";
import { complaintMap } from "../data/complaintMap";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const query = input.toLowerCase().trim();
    if (!query) return;

    let lastMatchType = "Others - Miscellaneous";

    // Poore sentence me sequential scan
    for (const keyword in complaintMap) {
      if (query.includes(keyword)) {
        lastMatchType = complaintMap[keyword]; // overwrite every time → last match ban jayega
      }
    }

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      { sender: "bot", text: lastMatchType }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Complaint Chatbot</h1>

      <div style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "400px",
        overflowY: "auto",
        background: "#f9f9f9",
        borderRadius: "5px"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "10px 0" }}>
            <span style={{
              background: msg.sender === "user" ? "#0070f3" : "#e0e0e0",
              color: msg.sender === "user" ? "#fff" : "#000",
              padding: "8px 12px",
              borderRadius: "15px",
              display: "inline-block"
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px", display: "flex" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "8px 12px",
            marginLeft: "5px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
