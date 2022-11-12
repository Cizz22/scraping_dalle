const express = require("express");
const app = express();
const { get_image } = require("./script");
const fs = require("fs");
const request = require("request");

app.get("/", function (req, res) {
  res.send(
    "access /download/Collection ID , example: https://labs.openai.com/sc/SCh47h0IOwlufV5pIhiE7qTu => SCh47h0IOwlufV5pIhiE7qTu (this is the collection ID)"
  );
});

app.get("/download/:id", async function (req, res) {
  const URL = `https://labs.openai.com/sc/${req.params.id}`;
  const data = await get_image(URL);

  res.setHeader("Content-Type", "image/png");

  data.image.forEach((element) => {
    request(element.url).pipe(
      fs.createWriteStream(`./image/image-${data.collection}-${element.id}.png`)
    );
  });

  res.send("success");
});

app.listen(3000, function () {
    console.log("App listening on port 3000!");
});

