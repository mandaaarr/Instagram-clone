const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoute);

// DIRECT CONNECTION STRING (No .env needed for now)
const MONGO_URI = "mongodb+srv://admin:Mk216181@cluster0.9dzep1i.mongodb.net/?appName=Cluster0";
mongoose.connect(MONGO_URI, { family: 4 })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
      console.log("❌ Connection Failed. Switching to Local...");
      console.error(err);
  });

app.get('/', (req, res) => {
    res.send("API is running...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));