const express = require("express");
const { connectToMongoDB } = require("./routes/connect");
const urlRoutes = require("./routes/url");
const app = express();
const PORT = 8002;

connectToMongoDB(
  "mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/shorturl"
).then(() => console.log("Connected to MongoDB"));

app.use(express.json());
app.use("/url", urlRoutes);

app.get("/:shordId", async (req, res) => {
  const shortId = req.params.shordId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {timestamp: Date.now(),}
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener Service!");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
