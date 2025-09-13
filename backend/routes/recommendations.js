// backend/routes/recommendations.js
const express = require('express');
const router = express.Router();

// Uses global fetch (Node 18+). Deezer public search provides preview links.
router.post('/recommendations', async (req, res) => {
  const { genre = '' } = req.body;
  try {
    const q = encodeURIComponent(genre || '');
    const response = await fetch(`https://api.deezer.com/search?q=${q}`);
    const json = await response.json();

    const results = (json.data || []).slice(0, 8).map((t, i) => ({
      id: t.id || i,
      title: t.title,
      artist: t.artist?.name || 'Unknown',
      previewUrl: t.preview || null,
      cover: t.album?.cover_medium || null
    }));

    res.json(results);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
