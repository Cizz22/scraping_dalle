const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const webp = require("webp-converter");
webp.grant_permission();

async function downloadImage(url, filename) {
  const path = Path.resolve(__dirname, "image", filename);
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

module.exports = downloadImage;
