// Deletes the users created by loadtest/elyze-x2.js (isLoadTest = true) and their answers.
//
//   npx tsx scripts/delete-load-test-users.ts            # dry run: counts only
//   npx tsx scripts/delete-load-test-users.ts --confirm  # deletes
import prisma from "../src/prisma";

const BATCH = 5000;
const confirm = process.argv.includes("--confirm");

const loadTestUser = { isLoadTest: true, pseudo: null, isCandidate: false };

async function main() {
  const users = await prisma.user.count({ where: loadTestUser });
  const answers = await prisma.answer.count({ where: { user: loadTestUser } });
  const realUsers = await prisma.user.count({ where: { isLoadTest: false } });
  console.log(`load test: ${users} users, ${answers} answers — real users kept: ${realUsers}`);
  if (!confirm) {
    console.log("dry run, nothing deleted (add --confirm)");
    return;
  }

  // Batches keep each transaction short: the site stays usable during the cleanup.
  let deletedUsers = 0;
  for (;;) {
    const batch = await prisma.user.findMany({ where: loadTestUser, select: { id: true }, take: BATCH });
    if (!batch.length) break;
    const ids = batch.map((u) => u.id);
    await prisma.$transaction([
      prisma.answer.deleteMany({ where: { userId: { in: ids } } }),
      prisma.user.deleteMany({ where: { id: { in: ids }, ...loadTestUser } }),
    ]);
    deletedUsers += ids.length;
    console.log(`${deletedUsers} / ${users} users deleted`);
  }

  console.log(`done — real users still there: ${await prisma.user.count({ where: { isLoadTest: false } })}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
