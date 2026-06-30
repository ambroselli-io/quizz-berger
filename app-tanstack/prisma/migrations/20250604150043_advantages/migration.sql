-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Advantage" ADD VALUE 'PROGRAM_20_OFF';
ALTER TYPE "Advantage" ADD VALUE 'PROGRAM_10_OFF';
ALTER TYPE "Advantage" ADD VALUE 'COACHING_50_OFF';
ALTER TYPE "Advantage" ADD VALUE 'COACHING_20_OFF';
ALTER TYPE "Advantage" ADD VALUE 'COACHING_10_OFF';
