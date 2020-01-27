import {MigrationInterface, QueryRunner} from "typeorm";

export class fixEntityDetails1579724751522 implements MigrationInterface {
    name = 'fixEntityDetails1579724751522'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `fecha_nac` `fecha_nac` timestamp NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `fecha_nac` `fecha_nac` timestamp NOT NULL", undefined);
    }

}
