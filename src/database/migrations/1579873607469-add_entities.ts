import {MigrationInterface, QueryRunner} from "typeorm";

export class addEntities1579873607469 implements MigrationInterface {
    name = 'addEntities1579873607469'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `tipo_ruta` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', UNIQUE INDEX `IDX_7795e79a28e39d3505b81e7d39` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `servicios` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `ruta_id` int NULL, `jaula_id` int NULL, `chofer_id` int NULL, `apoyoA_id` int NULL, `apoyoB_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `jaulas` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `cod_jaula` int NOT NULL, `description` varchar(255) NOT NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', UNIQUE INDEX `IDX_fd0cbe1a72360cf352b5e4f3a6` (`cod_jaula`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_14f4cf52f526cad53d8a7db2bd4` FOREIGN KEY (`ruta_id`) REFERENCES `tipo_ruta`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_4765304e6d6eaed7d67d6106b29` FOREIGN KEY (`jaula_id`) REFERENCES `jaulas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_d787293523c7d893c44a45e8c98` FOREIGN KEY (`chofer_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_d9ac3053c7c50cccee765dad07a` FOREIGN KEY (`apoyoA_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `servicios` ADD CONSTRAINT `FK_e8d5cf5a94febe18b1e8211be05` FOREIGN KEY (`apoyoB_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_e8d5cf5a94febe18b1e8211be05`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_d9ac3053c7c50cccee765dad07a`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_d787293523c7d893c44a45e8c98`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_4765304e6d6eaed7d67d6106b29`", undefined);
        await queryRunner.query("ALTER TABLE `servicios` DROP FOREIGN KEY `FK_14f4cf52f526cad53d8a7db2bd4`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fd0cbe1a72360cf352b5e4f3a6` ON `jaulas`", undefined);
        await queryRunner.query("DROP TABLE `jaulas`", undefined);
        await queryRunner.query("DROP TABLE `servicios`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7795e79a28e39d3505b81e7d39` ON `tipo_ruta`", undefined);
        await queryRunner.query("DROP TABLE `tipo_ruta`", undefined);
    }

}
