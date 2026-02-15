import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";

const BUCKET_NAME = "quizz-du-berger-og";

const s3Client = new S3Client({
  endpoint: `https://${process.env.CELLAR_ADDON_HOST}`,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.CELLAR_ADDON_KEY_ID!,
    secretAccessKey: process.env.CELLAR_ADDON_KEY_SECRET!,
  },
});

export async function uploadBuffer(buffer: Buffer, fileName: string, cacheControl?: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: "image/png",
    ACL: ObjectCannedACL.public_read,
    CacheControl: cacheControl ?? "max-age=31536000",
  });

  try {
    await s3Client.send(command);
    return `https://${BUCKET_NAME}.${process.env.CELLAR_ADDON_HOST}/${fileName}`;
  } catch (err) {
    console.error("S3 upload failed for", fileName, err);
    throw err;
  }
}
