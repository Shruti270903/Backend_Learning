const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const {restrictToLoggedInUserOnly, checkAuth} = require("./middleware/auth.js");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/shorturlwithAuth"
).then(() => console.log("Connected to MongoDBC"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute); 
app.use("/user", userRoute);
app.use("/",checkAuth, staticRoute);

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {timestamp: Date.now(),}
      },
    },
    {new: true}
  );
  if(!entry){
    return res.status(404).json({ error: 'Short URL not found' });
  }
  return res.redirect(entry.redirectURL);
});

app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener Service!");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/`)
);
