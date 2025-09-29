const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Redis client
const client = createClient({
  url: 'redis://user:password@127.0.0.1:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('✅ Redis connected'));

// Connect to Redis before starting the server
(async () => {
  await client.connect();
  console.log('Redis client connected');
})();

// Data savinng post request handling
app.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    const key = `form:${Date.now()}`;
    await client.set(key, JSON.stringify(data));
    res.json({ success: true, message: 'Data saved in Redis!', key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error saving to Redis' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
