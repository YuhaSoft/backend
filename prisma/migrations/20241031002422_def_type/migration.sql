/*
  Warnings:

  - Made the column `type` on table `image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `image` MODIFY `type` ENUM('user', 'image') NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `user` MODIFY `type` ENUM('user', 'image') NOT NULL DEFAULT 'user';
