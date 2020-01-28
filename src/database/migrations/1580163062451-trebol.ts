import {MigrationInterface, QueryRunner} from "typeorm";

export class trebol1580163062451 implements MigrationInterface {
    name = 'trebol1580163062451'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `tipo_ruta` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', UNIQUE INDEX `IDX_7795e79a28e39d3505b81e7d39` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users_details` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NULL, `lastname` varchar(255) NULL, `fecha_nac` timestamp NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `roles` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `description` text NOT NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `users` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `n_document` varchar(15) NOT NULL, `password` varchar(255) NOT NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', `detail_id` int NOT NULL, UNIQUE INDEX `IDX_729b170a4e6d28358ed6e07177` (`n_document`), UNIQUE INDEX `REL_9fc134ca20766e165ad650ee74` (`detail_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `img_detail` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `img_id` varchar(255) NULL, `img_url` varchar(255) NULL, `secure_url` varchar(255) NULL, `servicio_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `servicios` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `ruta_id` int NULL, `jaula_id` int NULL, `chofer_id` int NULL, `apoyoA_id` int NULL, `apoyoB_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `jaulas` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `cod_jaula` int NOT NULL, `description` varchar(255) NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', UNIQUE INDEX `IDX_fd0cbe1a72360cf352b5e4f3a6` (`cod_jaula`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles` (`usersId` int NOT NULL, `rolesId` int NOT NULL, INDEX `IDX_99b019339f52c63ae615358738` (`usersId`), INDEX `IDX_13380e7efec83468d73fc37938` (`rolesId`), PRIMARY KEY (`usersId`, `rolesId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_9fc134ca20766e165ad650ee740` FOREIGN KEY (`detail_id`) REFERENCES `users_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `img_detail` ADD CONSTRAINT `FK_2f9fcef5694d454895008bb0e0d` FOREIGN KEY (`servicio_id`) REFERENCES `servicios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_14f4cf52f526cad53d8a7db2bd4` FOREIGN KEY (`ruta_id`) REFERENCES `tipo_ruta`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_4765304e6d6eaed7d67d6106b29` FOREIGN KEY (`jaula_id`) REFERENCES `jaulas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_d787293523c7d893c44a45e8c98` FOREIGN KEY (`chofer_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_d9ac3053c7c50cccee765dad07a` FOREIGN KEY (`apoyoA_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_e8d5cf5a94febe18b1e8211be05` FOREIGN KEY (`apoyoB_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_99b019339f52c63ae6153587380` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` ADD CONSTRAINT `FK_13380e7efec83468d73fc37938e` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_13380e7efec83468d73fc37938e`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_99b019339f52c63ae6153587380`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_e8d5cf5a94febe18b1e8211be05`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_d9ac3053c7c50cccee765dad07a`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_d787293523c7d893c44a45e8c98`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_4765304e6d6eaed7d67d6106b29`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_14f4cf52f526cad53d8a7db2bd4`", undefined);
        await queryRunner.query("ALTER TABLE `img_detail` DROP FOREIGN KEY `FK_2f9fcef5694d454895008bb0e0d`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_9fc134ca20766e165ad650ee740`", undefined);
        await queryRunner.query("DROP INDEX `IDX_13380e7efec83468d73fc37938` ON `user_roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_99b019339f52c63ae615358738` ON `user_roles`", undefined);
        await queryRunner.query("DROP TABLE `user_roles`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fd0cbe1a72360cf352b5e4f3a6` ON `jaulas`", undefined);
        await queryRunner.query("DROP TABLE `jaulas`", undefined);
        await queryRunner.query("DROP TABLE `servicios`", undefined);
        await queryRunner.query("DROP TABLE `img_detail`", undefined);
        await queryRunner.query("DROP INDEX `REL_9fc134ca20766e165ad650ee74` ON `users`", undefined);
        await queryRunner.query("DROP INDEX `IDX_729b170a4e6d28358ed6e07177` ON `users`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
        await queryRunner.query("DROP TABLE `users_details`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7795e79a28e39d3505b81e7d39` ON `tipo_ruta`", undefined);
        await queryRunner.query("DROP TABLE `tipo_ruta`", undefined);
    }

}
