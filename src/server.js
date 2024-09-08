const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  userId: { type: String, unique: true, default: uuidv4 },
});

const User = mongoose.model('User', userSchema);

// Endpoint to save the username
app.post('/api/addUser', async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = new User({ name: username });
    const savedUser = await newUser.save();
    res.json({ userId: savedUser.userId, username: savedUser.name });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});
app.get('/api/getUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ username: user.name });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
