const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running', timestamp: new Date() });
});

app.get('/api/scores', (req, res) => {
    // Placeholder for score database
    res.json([
        { username: 'Player1', score: 1000 },
        { username: 'Player2', score: 850 },
        { username: 'Guest', score: 500 }
    ]);
});

// Serve static assets in production
// Assuming the client build will be named 'dist' inside the client folder
// But during dev, we run separate servers.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
