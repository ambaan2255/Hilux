const ID3Writer = require("browser-id3-writer");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { tmpdir } = require("os");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");

async function imageToWebp(media) {
  const tmpFileOut = path.join(
    tmpdir(),
    `sticker.webp`
  );
  const tmpFileIn = path.join(
    tmpdir(),
    `sticker.jpg`
  );

  fs.writeFileSync(tmpFileIn, media);

  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
      ])
      .toFormat("webp")
      .save(tmpFileOut);
  });

  const buff = fs.readFileSync(tmpFileOut);
  fs.unlinkSync(tmpFileOut);
  fs.unlinkSync(tmpFileIn);
  return buff;
}

async function videoToWebp(media) {
  const tmpFileOut = path.join(
    tmpdir(),
    `sticker.webp`
  );
  const tmpFileIn = path.join(
    tmpdir(),
    `sticker.mp4`
  );

  fs.writeFileSync(tmpFileIn, media);

  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        "-loop",
        "0",
        "-ss",
        "00:00:00",
        "-t",
        "00:00:05",
        "-preset",
        "default",
        "-an",
        "-vsync",
        "0",
      ])
      .toFormat("webp")
      .save(tmpFileOut);
  });

  const buff = fs.readFileSync(tmpFileOut);
  fs.unlinkSync(tmpFileOut);
  fs.unlinkSync(tmpFileIn);
  return buff;
}

async function writeExifImg(media, metadata) {
  let wMedia = await imageToWebp(media);
  const tmpFileIn = path.join(
    tmpdir(),
    `sticker.webp`
  );
  const tmpFileOut = path.join(
    tmpdir(),
    `sticker.webp`
  );
  fs.writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const json = {
      "sticker-pack-id": `https://github.com/Viper-X0`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""],
    };
    const exifAttr = Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(tmpFileIn);
    fs.unlinkSync(tmpFileIn);
    img.exif = exif;
    await img.save(tmpFileOut);
    return tmpFileOut;
  }
}

async function writeExifVid(media, metadata) {
  let wMedia = await videoToWebp(media);
  const tmpFileIn = path.join(
    tmpdir(),
    `sticker.webp`
  );
  const tmpFileOut = path.join(
    tmpdir(),
    `sticker.webp`
  );
  fs.writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const json = {
      "sticker-pack-id": `https://github.com/Viper-X0`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""],
    };
    const exifAttr = Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(tmpFileIn);
    fs.unlinkSync(tmpFileIn);
    img.exif = exif;
    await img.save(tmpFileOut);
    return tmpFileOut;
  }
}

async function writeExifWebp(media, metadata) {
  const tmpFileIn = path.join(
    tmpdir(),
    `sticker.webp`
  );
  const tmpFileOut = path.join(
    tmpdir(),
    `sticker.webp`
  );
  fs.writeFileSync(tmpFileIn, media);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const json = {
      "sticker-pack-id": `https://github.com/Viper-X0`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""],
    };
    const exifAttr =await  Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);
    const jsonBuff =await  Buffer.from(JSON.stringify(json), "utf-8");
    const exif = await Buffer.concat([exifAttr, jsonBuff]);
  await  exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(tmpFileIn);
    fs.unlinkSync(tmpFileIn);
    img.exif = exif;
    await img.save(tmpFileOut);
    return tmpFileOut;
  }
}

async function getBuffer(url, options) {
    try {
        options ? options: {};
        const res = await require("axios")({
            method: "get",
            url,
            headers: {
                DNT: 1,
                "Upgrade-Insecure-Request": 1,
            },
            ...options,
            responseType: "arraybuffer",
        });
        return res.data;
    } catch (e) {
        console.log(`Error : ${e}`);
    }
}

async function AddMp3Meta(
    songbuffer,
    coverBuffer,
    options = {
        title: `Viper-x0 Whatsapp bot`, artist: ""
    }
) {
    /*if (!Buffer.isBuffer(songbuffer)) {
        songbuffer = await getBuffer(songbuffer);
    }
    if (!Buffer.isBuffer(coverBuffer)) {
        coverBuffer = await getBuffer(coverBuffer);
    }*/
      const audio = await toAudio(songbuffer, "mp3")
    const writer = new ID3Writer(audio);
    writer
    .setFrame("TIT2", options.title)
    .setFrame('TPE1', [`${options.artist}`])
    .setFrame('TALB', ' ')
    .setFrame('TYER', 2004)
    .setFrame('APIC', {
      type: 3,
      data: coverBuffer,
      description: 'Super picture'
  })
    writer.addTag();
    return Buffer.from(writer.arrayBuffer);
}

async function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, "./tmp", +new Date() + "." + ext);
      let out = tmp + "." + ext2;
      await fs.promises.writeFile(tmp, buffer);
      spawn("ffmpeg", ["-y", "-i", tmp, ...args, out])
        .on("error", reject)
        .on("close", async (code) => {
          try {
            await fs.promises.unlink(tmp);
            if (code !== 0) return reject(code);
            resolve(await fs.promises.readFile(out));
            await fs.promises.unlink(out);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

async function toAudio(buffer, ext) {
  return ffmpeg(
    buffer,
    ["-vn", "-ac", "2", "-b:a", "128k", "-ar", "44100", "-f", "mp3"],
    ext,
    "mp3"
  );
}

module.exports = {
    AddMp3Meta,
    toAudio,
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
    writeExifWebp
}
