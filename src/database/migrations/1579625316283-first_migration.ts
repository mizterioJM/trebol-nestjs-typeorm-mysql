import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable-next-line: class-name
export class firstMigration1579625316283 implements MigrationInterface {
  name = 'firstMigration1579625316283';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(25) NOT NULL, `password` varchar(255) NOT NULL, `status` enum ('ACTIVO', 'INACTIVO') NOT NULL DEFAULT 'ACTIVO', `create_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `users`', undefined);
  }
}
