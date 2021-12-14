import express from 'express';
import fs from 'fs';
import sharp from 'sharp';

const imageApi = express.Router();

imageApi.get('/', (req, res) => {
  // create thump folder
  if (!fs.existsSync(`./assets/thump`)) {
    fs.mkdirSync(`./assets/thump`);
  }
  const x = req.query.width as unknown as string;
  const y = req.query.hight as unknown as string;
  const fileName = req.query.filename as unknown as string;

  // Check if all prams are passed
  if (x && y && fileName) {
    // Cache response for 1 day ...
    res.set({
      'Cache-Control': 'public, max-age=86400',
      Expires: new Date(Date.now() + 86400000).toUTCString(),
    });

    // check file already exist
    if (fs.existsSync(`./assets/thump/${fileName}-${x}_${y}.jpg`)) {
      const src = fs.createReadStream(
        `./assets/thump/${fileName}-${x}_${y}.jpg`
      );
      src.pipe(res);

      // check file exist or not
    } else if (fs.existsSync(`./assets/full/${fileName}.jpg`)) {
      // resize image suing sharp
      sharp(`./assets/full/${fileName}.jpg`)
        .resize(parseInt(x), parseInt(y))
        .toFile(`./assets/thump/${fileName}-${x}_${y}.jpg`, function (err) {
          // if err happen when resizing
          if (err) {
            res.send('Something went wrong : ' + err);
          }
          const src = fs.createReadStream(
            `./assets/thump/${fileName}-${x}_${y}.jpg`
          );
          src.pipe(res);
        });
      // if filename is wrong
    } else {
      res.status(400);
      res.send('Sorry cant find file ');
    }
    // if any pram missed
  } else {
    res.status(400);
    res.send('You missed one or more argument [hight , width , filename] !');
  }
});

export default imageApi;
