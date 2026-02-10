import fs from "fs-extra";
import path from "path";

const copyPrismaToApp = async () => {
  const sourcePath = path.resolve("./prisma");

  const destinationPath2 = path.resolve("../app-react-router/prisma");
  try {
    await fs.copy(sourcePath, destinationPath2, {
      overwrite: true,
      errorOnExist: false,
    });
    console.log("Prisma folder successfully copied to app-react-router folder");
  } catch (err) {
    console.error("Error copying Prisma folder:", err);
  }
};

copyPrismaToApp();
