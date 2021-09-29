const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var HashMap = require("hashmap");
var map = new HashMap();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log("We are live on " + port);
});

app.get("/shortener/url", (req, res) => {
  const fullUrl = map.get(req.body.shortUrl);
  res.status(200).json({
    fullUrl: fullUrl,
  });
});

app.get("/shortener/create", (req, res) => {
  const shortUrl = (Math.random() + 1).toString(36).substring(7);
  const fullUrl = req.body.fullUrl;
  try {
    map.set(shortUrl, fullUrl);
    res.status(200).json({
      message: "URL created successfully!",
      url: { shortUrl: shortUrl, fullUrl: fullUrl },
    });
  } catch {
    res.status(400).json({
      message: "Error creating short URL",
    });
  }
});
