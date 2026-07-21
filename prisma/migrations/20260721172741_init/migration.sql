-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` CHAR(2) NULL,

    UNIQUE INDEX `countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `styles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `styles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `sortName` VARCHAR(250) NOT NULL,
    `city` VARCHAR(100) NULL,
    `formedYear` INTEGER NULL,
    `formedMonth` INTEGER NULL,
    `formedDay` INTEGER NULL,
    `endedYear` INTEGER NULL,
    `endedMonth` INTEGER NULL,
    `endedDay` INTEGER NULL,
    `homepage` VARCHAR(255) NULL,
    `biography` LONGTEXT NOT NULL,
    `countryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `bands_name_idx`(`name`),
    INDEX `bands_sortName_idx`(`sortName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `band_styles` (
    `bandId` INTEGER NOT NULL,
    `styleId` INTEGER NOT NULL,

    PRIMARY KEY (`bandId`, `styleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bands` ADD CONSTRAINT `bands_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `band_styles` ADD CONSTRAINT `band_styles_bandId_fkey` FOREIGN KEY (`bandId`) REFERENCES `bands`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `band_styles` ADD CONSTRAINT `band_styles_styleId_fkey` FOREIGN KEY (`styleId`) REFERENCES `styles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
