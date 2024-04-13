-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT DEFAULT 'Anonymous',
ADD COLUMN     "currentRole" TEXT DEFAULT 'Human',
ADD COLUMN     "interestedSubjects" TEXT[],
ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY['English']::TEXT[];
