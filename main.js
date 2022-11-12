const { get_image } = require("./script");
const fs = require("fs");

const main = async (url) => {
  const data = await get_image(url);

  console.log(data);

  fs.writeFile(
    `${data.collection}.json`,
    JSON.stringify(data),
    "utf-8",
    (err) => {
      console.log(err);
    }
  );

  //Uncomment if you want to download the image (so freaking slow)
  //data.image.forEach(async (image) => {
  //     downloadImage(image.url, `image-${data.collection}-${image.id}.png`)
  //       .then(() => {
  //         console.log("success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
};

// Ganti Url Collection Disini (harus public url)
const URL = "https://labs.openai.com/sc/SCh47h0IOwlufV5pIhiE7qTu";

main(URL);
