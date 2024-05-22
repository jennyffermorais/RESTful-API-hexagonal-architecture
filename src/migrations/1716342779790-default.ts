import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716342779790 implements MigrationInterface {
    name = 'Default1716342779790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`name\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`client\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`name\` varchar(255) NOT NULL`);
    }

}
