const fs = require("fs");
const AWS = require("aws-sdk");

AWS.config.update({ accessKeyId: process.env.CELLAR_ADDON_KEY_ID, secretAccessKey: process.env.CELLAR_ADDON_KEY_SECRET });

const s3bucket = new AWS.S3({ endpoint: process.env.CELLAR_ADDON_HOST });

exports.uploadBuffer = (buffer, fileName) =>
  new Promise((resolve, reject) => {
    // Setting up S3 upload parameters
    const params = {
      Bucket: "quizz-du-berger-pictures",
      Key: fileName, // File name you want to save as in S3
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read",
      Metadata: { "Cache-Control": "max-age=31536000" },
    };

    // Uploading files to the bucket
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log("error is ", err);
        console.log("file didnt upload ", fileName);
        reject(err);
      }
      resolve(`File ${fileName} uploaded successfully. ${data.Location}`);
    });
  });

exports.uploadPublicPicture = (path, file) => {
  return new Promise((resolve, reject) => {
    const s3bucket = new AWS.S3({
      endpoint: CELLAR_ENDPOINT,
      accessKeyId: CELLAR_KEYID,
      secretAccessKey: CELLAR_KEYSECRET,
    });
    const params = {
      Bucket: "quizz-du-berger-pictures",
      Key: path,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: "public-read",
      Metadata: { "Cache-Control": "max-age=31536000" },
    };
    s3bucket.upload(params, function (err, data) {
      if (err) return reject(`error in callback:${err}`);
      resolve(data);
    });
  });
};

const uploadLocalFile = (name) =>
  new Promise((resolve, reject) => {
    // Read content from the file
    const fileContent = fs.readFileSync(`./public/images/${name}`);

    // Setting up S3 upload parameters
    const params = {
      Bucket: "quizz-du-berger-pictures",
      Key: name, // File name you want to save as in S3
      Body: fileContent,
      ContentType: "image/jpeg",
      ACL: "public-read",
      Metadata: { "Cache-Control": "max-age=31536000" },
    };

    // Uploading files to the bucket
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log("file didnt upload ", name);
        console.log(
          "setup ",
          { accessKeyId: process.env.CELLAR_ADDON_KEY_ID, secretAccessKey: process.env.CELLAR_ADDON_KEY_SECRET },
          { endpoint: process.env.CELLAR_ADDON_HOST }
        );
        console.log("error is ", err);
        reject(err);
      }
      resolve(`File ${name} uploaded successfully. ${data.Location}`);
    });
  });

const deleteBucket = async (Bucket) => {
  try {
    console.log(`Deleting ${Bucket}`);
    // We can't delete a bucket before emptying its contents
    const { Contents } = await s3bucket.listObjects({ Bucket }).promise();
    if (Contents.length > 0) {
      await s3bucket
        .deleteObjects({
          Bucket,
          Delete: {
            Objects: Contents.map(({ Key }) => ({ Key })),
          },
        })
        .promise();
    }
    await s3bucket.deleteBucket({ Bucket }).promise();
    console.log("deleted");
  } catch (err) {
    console.log("\n", err, "\n");
    return false;
  }
};
// deleteBucket("quizz-du-berger-pictures");

const uploadAllLocalFiles = async () => {
  let images = await new Promise((resolve, reject) => {
    fs.readdir("./public/images", function (error, files) {
      if (error) reject(error);
      resolve(files);
    });
  }).catch((error) => console.log("error in prom", error));

  images = images.filter((i) => i !== ".DS_Store");
  console.log("uploading " + images.length + " images");

  for (let [index, image] of Object.entries(images)) {
    const done = await uploadLocalFile(image);
    console.log(index, done);
  }
};

// uploadAllLocalFiles();
