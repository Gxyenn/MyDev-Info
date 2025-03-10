const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ApiKeySchema = new mongoose.Schema({
    userId: String,
    apiKey: String,
});

const ApiKey = mongoose.model('ApiKey', ApiKeySchema);

function generateApiKey() {
    return crypto.randomBytes(32).toString('hex');
}

app.post('/api/reset-api', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID wajib diisi' });
    }

    const newApiKey = generateApiKey();
    let apiKeyData = await ApiKey.findOne({ userId });

    if (apiKeyData) {
        apiKeyData.apiKey = newApiKey;
    } else {
        apiKeyData = new ApiKey({ userId, apiKey: newApiKey });
    }

    await apiKeyData.save();
    res.json({ message: 'API Key berhasil direset', apiKey: newApiKey });
});

module.exports = app;
