-- CreateTable
CREATE TABLE `employer` (
    `employer_id` VARCHAR(191) NOT NULL,
    `employer_email` VARCHAR(191) NOT NULL,
    `employer_pwd` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employer_employer_email_key`(`employer_email`),
    PRIMARY KEY (`employer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidate` (
    `candidate_id` VARCHAR(191) NOT NULL,
    `candidate_name` VARCHAR(191) NULL,
    `candidate_email` VARCHAR(191) NULL,
    `candidate_phone` VARCHAR(191) NULL,
    `candidate_nationality` VARCHAR(191) NULL,
    `candidate_designation` VARCHAR(191) NULL,
    `candidate_edu` VARCHAR(191) NULL,
    `candidate_gpa` VARCHAR(191) NULL,
    `empId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`candidate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidate_language` (
    `cl_id` VARCHAR(191) NOT NULL,
    `cl_name` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cl_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidate_skills` (
    `ck_id` VARCHAR(191) NOT NULL,
    `ck_name` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ck_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidate_xp` (
    `cxp_id` VARCHAR(191) NOT NULL,
    `cxp_position` VARCHAR(191) NULL,
    `cxp_duration` VARCHAR(191) NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cxp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `file_id` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `candidate_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `File_candidate_id_key`(`candidate_id`),
    PRIMARY KEY (`file_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `candidate` ADD CONSTRAINT `candidate_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `employer`(`employer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidate_language` ADD CONSTRAINT `candidate_language_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidate`(`candidate_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidate_skills` ADD CONSTRAINT `candidate_skills_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidate`(`candidate_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidate_xp` ADD CONSTRAINT `candidate_xp_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidate`(`candidate_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidate`(`candidate_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
