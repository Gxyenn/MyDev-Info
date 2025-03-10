const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let validKeys = [];

app.get("/generate", (req, res) => {
    let apiKey = "API-" + Math.random().toString(36).substr(2, 12).toUpperCase();
    validKeys.push(apiKey);
    res.json({ apikey: apiKey });
});

app.get("/validate", (req, res) => {
    let key = req.query.key;
    if (validKeys.includes(key)) {
        res.json({ valid: true, message: "✅ API Key Valid!" });
    } else {
        res.json({ valid: false, message: "❌ API Key Tidak Valid!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server berjalan di port " + PORT));
