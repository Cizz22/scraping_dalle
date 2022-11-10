const puppeteer = require("puppeteer");

const get_image = async (URL) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2" });

  await page.waitForSelector("img[alt='Original']");

  const data = await page.evaluate(() => {
    coll = {
      collection: "",
      image: [],
    };
    const images = Array.from(document.querySelectorAll("img[alt='Original']"));
    coll.collection = document.querySelector(".h3-sansserif").innerHTML;

    document.querySelectorAll("img[alt='Original']");

    let id = 0;
    images.forEach((image) => {
      id++;
      image_png = image.src.replace("webp", "png");
      coll.image.push({
        id,
        url: image_png,
      });
    });

    return coll;
  });

  await browser.close();
  return data;
};

module.exports = {
  get_image,
};
