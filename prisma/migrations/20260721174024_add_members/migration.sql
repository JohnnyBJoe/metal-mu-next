-- CreateTable
CREATE TABLE `instruments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `instruments_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `birthYear` INTEGER NULL,
    `birthMonth` INTEGER NULL,
    `birthDay` INTEGER NULL,
    `deathYear` INTEGER NULL,
    `deathMonth` INTEGER NULL,
    `deathDay` INTEGER NULL,
    `biography` LONGTEXT NULL,

    INDEX `members_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `band_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bandId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,
    `instrumentId` INTEGER NOT NULL,
    `joinedYear` INTEGER NULL,
    `joinedMonth` INTEGER NULL,
    `joinedDay` INTEGER NULL,
    `leftYear` INTEGER NULL,
    `leftMonth` INTEGER NULL,
    `leftDay` INTEGER NULL,
    `current` BOOLEAN NOT NULL DEFAULT true,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `band_members_bandId_idx`(`bandId`),
    INDEX `band_members_memberId_idx`(`memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `band_members` ADD CONSTRAINT `band_members_bandId_fkey` FOREIGN KEY (`bandId`) REFERENCES `bands`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `band_members` ADD CONSTRAINT `band_members_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `band_members` ADD CONSTRAINT `band_members_instrumentId_fkey` FOREIGN KEY (`instrumentId`) REFERENCES `instruments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
