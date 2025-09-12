import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Fetch real music from Deezer API
app.post("/api/recommendations", async (req, res) => {
  const { genre } = req.body;

  try {
    const response = await fetch(`https://api.deezer.com/search?q=${genre}`);
    const data = await response.json();

    // Take top 5 tracks
    const results = data.data.slice(0, 5).map((track, index) => ({
      id: index + 1,
      title: track.title,
      artist: track.artist.name,
      genre: genre,
      previewUrl: track.preview, // real 30s audio preview
      cover: track.album.cover_medium, // album cover image
    }));

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

app.listen(4000, () => console.log("✅ Backend running on http://localhost:4000"));
