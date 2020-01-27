import {MigrationInterface, QueryRunner} from "typeorm";

export class fixEntity1579724496776 implements MigrationInterface {
    name = 'fixEntity1579724496776'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_9fc134ca20766e165ad650ee74` ON `users`", undefined);
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `name` `name` varchar(50) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `lastname` `lastname` varchar(255) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `lastname` `lastname` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `name` `name` varchar(50) NOT NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_9fc134ca20766e165ad650ee74` ON `users` (`detail_id`)", undefined);
    }

}
