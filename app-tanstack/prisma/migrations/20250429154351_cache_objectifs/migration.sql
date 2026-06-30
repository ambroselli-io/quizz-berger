-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activites_cache" TEXT[],
ADD COLUMN     "defis_personnels_cache" TEXT[],
ADD COLUMN     "habitudes_cache" TEXT[],
ADD COLUMN     "objectifs_autres_cache" TEXT[],
ADD COLUMN     "objectifs_prios_cache" TEXT[];
