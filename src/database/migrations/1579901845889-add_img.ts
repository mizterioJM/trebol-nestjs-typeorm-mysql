import {MigrationInterface, QueryRunner} from "typeorm";

export class addImg1579901845889 implements MigrationInterface {
    name = 'addImg1579901845889'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `img_detail` (`create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `img_id` varchar(255) NULL, `img_url` varchar(255) NULL, `secure_url` varchar(255) NULL, `servicioId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `jaulas` CHANGE `description` `description` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `img_detail` ADD CONSTRAINT `FK_d5f0de1e8c4761f783e5e7f4860` FOREIGN KEY (`servicioId`) REFERENCES `servicios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `img_detail` DROP FOREIGN KEY `FK_d5f0de1e8c4761f783e5e7f4860`", undefined);
        await queryRunner.query("ALTER TABLE `jaulas` CHANGE `description` `description` varchar(255) NOT NULL", undefined);
        await queryRunner.query("DROP TABLE `img_detail`", undefined);
    }

}
