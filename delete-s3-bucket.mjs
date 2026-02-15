/**
 * Delete all objects in a Clever Cloud Cellar S3 bucket.
 *
 * Usage:
 *   CELLAR_KEY=xxx CELLAR_SECRET=yyy node delete-s3-bucket.mjs
 *
 * Optional env vars:
 *   BUCKET  — bucket name (default: quizz-du-berger-pictures)
 *   PREFIX  — only delete objects under this prefix (default: "" = everything)
 *   DRY_RUN — set to "1" to list without deleting
 */

import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const BUCKET = process.env.BUCKET || "quizz-du-berger-pictures";
const PREFIX = process.env.PREFIX || "";
const DRY_RUN = process.env.DRY_RUN === "1";
const BATCH_SIZE = 1000; // S3 max per DeleteObjects request

if (!process.env.CELLAR_KEY || !process.env.CELLAR_SECRET) {
  console.error("Error: CELLAR_KEY and CELLAR_SECRET env vars are required.");
  console.error("Usage: CELLAR_KEY=xxx CELLAR_SECRET=yyy node delete-s3-bucket.mjs");
  process.exit(1);
}

const client = new S3Client({
  region: "us-east-1",
  endpoint: "https://cellar-c2.services.clever-cloud.com",
  credentials: {
    accessKeyId: process.env.CELLAR_KEY,
    secretAccessKey: process.env.CELLAR_SECRET,
  },
  forcePathStyle: true,
});

async function run() {
  let continuationToken = undefined;
  let totalListed = 0;
  let totalDeleted = 0;
  const startTime = Date.now();

  console.log(`Bucket:  ${BUCKET}`);
  console.log(`Prefix:  ${PREFIX || "(all)"}`);
  console.log(`Dry run: ${DRY_RUN}`);
  console.log("---");

  while (true) {
    // List a batch of objects
    const listRes = await client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: PREFIX || undefined,
        MaxKeys: BATCH_SIZE,
        ContinuationToken: continuationToken,
      })
    );

    const objects = listRes.Contents || [];
    if (objects.length === 0) break;

    totalListed += objects.length;

    if (DRY_RUN) {
      for (const obj of objects) {
        console.log(`  [dry-run] ${obj.Key} (${formatBytes(obj.Size)})`);
      }
    } else {
      // Delete the batch
      const deleteRes = await client.send(
        new DeleteObjectsCommand({
          Bucket: BUCKET,
          Delete: {
            Objects: objects.map((obj) => ({ Key: obj.Key })),
            Quiet: true,
          },
        })
      );

      const errors = deleteRes.Errors || [];
      const deletedCount = objects.length - errors.length;
      totalDeleted += deletedCount;

      if (errors.length > 0) {
        console.error(`  ⚠ ${errors.length} errors in this batch:`);
        for (const err of errors) {
          console.error(`    ${err.Key}: ${err.Message}`);
        }
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const rate = (totalListed / (elapsed || 1)).toFixed(0);
    process.stdout.write(
      `\r  Progress: ${totalListed} listed, ${totalDeleted} deleted | ${elapsed}s elapsed | ~${rate} obj/s`
    );

    if (!listRes.IsTruncated) break;
    continuationToken = listRes.NextContinuationToken;
  }

  console.log(""); // newline after progress
  console.log("---");
  console.log(`Done. Listed: ${totalListed}, Deleted: ${totalDeleted}`);
  console.log(`Total time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
