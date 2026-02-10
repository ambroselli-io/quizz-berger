/**
 * MongoDB JSON Backup to PostgreSQL Migration Script
 *
 * This script migrates data from MongoDB JSON backup files to PostgreSQL via Prisma.
 *
 * Prerequisites:
 * 1. Set DATABASE_URL environment variable for PostgreSQL
 * 2. Run: npx prisma generate
 *
 * Usage:
 * npx tsx scripts/migrate-from-json.ts
 */

import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Path to backup files
const BACKUP_DIR = path.resolve(__dirname, "../../../backup_2022-06-08");

// MongoDB extended JSON types
interface MongoOid {
  $oid: string;
}

interface MongoDate {
  $date: {
    $numberLong: string;
  };
}

interface MongoUser {
  _id: MongoOid;
  pseudo?: string;
  password?: string;
  themes?: string[];
  picture?: string;
  color?: string;
  isPublic?: boolean;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
  partyName?: string;
  isCandidate?: boolean;
  lastLoginAt?: MongoDate;
  friends?: MongoOid[];
  createdAt?: MongoDate;
  updatedAt?: MongoDate;
}

interface MongoAnswer {
  _id: MongoOid;
  user: MongoOid;
  themeId: string;
  questionId: string;
  answerIndex: number;
  createdAt?: MongoDate;
  updatedAt?: MongoDate;
}

// Helper to parse MongoDB date
function parseMongoDate(mongoDate?: MongoDate): Date {
  if (!mongoDate) return new Date();
  return new Date(parseInt(mongoDate.$date.$numberLong, 10));
}

// Helper to get ObjectId string
function getOid(oid?: MongoOid): string | undefined {
  return oid?.$oid;
}

async function migrate() {
  console.log("Reading JSON backup files from:", BACKUP_DIR);

  // Map old MongoDB ObjectIds to new UUIDs
  const userIdMap = new Map<string, string>();

  try {
    // Step 1: Read users from JSON
    console.log("\n--- Reading users.json ---");
    const usersJson = fs.readFileSync(path.join(BACKUP_DIR, "users.json"), "utf8");
    const mongoUsers: MongoUser[] = JSON.parse(usersJson);
    console.log(`Found ${mongoUsers.length} users in users.json`);

    // Step 2: Create UUID mapping and prepare user data
    console.log("\n--- Creating user ID mapping ---");
    const usersToCreate = mongoUsers.map((mongoUser) => {
      const oldId = getOid(mongoUser._id)!;
      const newId = randomUUID();
      userIdMap.set(oldId, newId);

      return {
        id: newId,
        pseudo: mongoUser.pseudo || null,
        password: mongoUser.password || "",
        themes: mongoUser.themes || [],
        picture: mongoUser.picture || null,
        color: mongoUser.color || null,
        isPublic: mongoUser.isPublic || false,
        isAdmin: mongoUser.isAdmin || false,
        firstName: mongoUser.firstName || null,
        lastName: mongoUser.lastName || null,
        partyName: mongoUser.partyName || null,
        isCandidate: mongoUser.isCandidate || false,
        lastLoginAt: mongoUser.lastLoginAt ? parseMongoDate(mongoUser.lastLoginAt) : null,
        createdAt: parseMongoDate(mongoUser.createdAt),
        updatedAt: parseMongoDate(mongoUser.updatedAt),
      };
    });

    // Step 3: Insert users into PostgreSQL
    console.log("\n--- Inserting users into PostgreSQL ---");
    let usersCreated = 0;

    // Use createMany in batches to avoid memory issues
    const BATCH_SIZE = 100;
    for (let i = 0; i < usersToCreate.length; i += BATCH_SIZE) {
      const batch = usersToCreate.slice(i, i + BATCH_SIZE);
      await prisma.user.createMany({
        data: batch,
        skipDuplicates: true,
      });
      usersCreated += batch.length;
      console.log(`  Created ${usersCreated}/${usersToCreate.length} users`);
    }

    // Step 4: Read answers from JSON
    console.log("\n--- Reading answers.json ---");
    const answersJson = fs.readFileSync(path.join(BACKUP_DIR, "answers.json"), "utf8");
    const mongoAnswers: MongoAnswer[] = JSON.parse(answersJson);
    console.log(`Found ${mongoAnswers.length} answers in answers.json`);

    // Step 5: Map and insert answers
    console.log("\n--- Inserting answers into PostgreSQL ---");
    let answersCreated = 0;
    let answersSkipped = 0;

    const answersToCreate = mongoAnswers
      .map((mongoAnswer) => {
        const oldUserId = getOid(mongoAnswer.user);
        if (!oldUserId) {
          answersSkipped++;
          return null;
        }
        const userId = userIdMap.get(oldUserId);
        if (!userId) {
          answersSkipped++;
          return null;
        }

        return {
          id: randomUUID(),
          userId,
          themeId: mongoAnswer.themeId,
          questionId: mongoAnswer.questionId,
          answerIndex: mongoAnswer.answerIndex,
          createdAt: parseMongoDate(mongoAnswer.createdAt),
          updatedAt: parseMongoDate(mongoAnswer.updatedAt),
        };
      })
      .filter((a): a is NonNullable<typeof a> => a !== null);

    for (let i = 0; i < answersToCreate.length; i += BATCH_SIZE) {
      const batch = answersToCreate.slice(i, i + BATCH_SIZE);
      await prisma.answer.createMany({
        data: batch,
        skipDuplicates: true,
      });
      answersCreated += batch.length;
      console.log(`  Created ${answersCreated}/${answersToCreate.length} answers`);
    }

    if (answersSkipped > 0) {
      console.log(`  Skipped ${answersSkipped} answers (user not found)`);
    }

    // Step 6: Resolve friends relations
    console.log("\n--- Resolving friends relations ---");
    let friendsRelationsCreated = 0;

    for (const mongoUser of mongoUsers) {
      if (!mongoUser.friends || mongoUser.friends.length === 0) continue;

      const oldUserId = getOid(mongoUser._id);
      if (!oldUserId) continue;

      const userId = userIdMap.get(oldUserId);
      if (!userId) continue;

      const friendIds = mongoUser.friends
        .map((friendOid) => {
          const oldFriendId = getOid(friendOid);
          return oldFriendId ? userIdMap.get(oldFriendId) : undefined;
        })
        .filter((id): id is string => id !== undefined);

      if (friendIds.length === 0) continue;

      await prisma.user.update({
        where: { id: userId },
        data: {
          friends: {
            connect: friendIds.map((id) => ({ id })),
          },
        },
      });

      friendsRelationsCreated += friendIds.length;
    }

    console.log(`  Created ${friendsRelationsCreated} friend relations`);

    // Summary
    console.log("\n========================================");
    console.log("Migration Summary:");
    console.log(`  Users migrated: ${usersCreated}`);
    console.log(`  Answers migrated: ${answersCreated}`);
    console.log(`  Answers skipped: ${answersSkipped}`);
    console.log(`  Friend relations: ${friendsRelationsCreated}`);
    console.log("========================================");
    console.log("\nMigration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrate().catch((error) => {
  console.error("Migration error:", error);
  process.exit(1);
});
