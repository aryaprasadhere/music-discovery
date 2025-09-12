import { useState } from "react";

function App() {
  const [genre, setGenre] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    if (!genre.trim()) return;
    setLoading(true);

    const response = await fetch("http://localhost:4000/api/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genre }),
    });
    const data = await response.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1>🎶 Music Discovery Platform</h1>
      <p>Type a genre or mood (e.g., Spiritual, Acoustic, Pop, Quran, Love)</p>

      <input
        type="text"
        placeholder="Enter genre..."
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem", width: "250px" }}
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "2rem" }}>
        {results.map((song) => (
          <div
            key={song.id}
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={song.cover} alt={song.title} style={{ width: "80px", borderRadius: "6px" }} />
            <div>
              <strong>{song.title}</strong> <br />
              <em>{song.artist}</em> <br />
              <audio controls src={song.previewUrl} style={{ marginTop: "0.5rem" }}></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
