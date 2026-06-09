import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class AddAvailabilityStatusToDoctorProfiles
  implements MigrationInterface
{
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE doctor_profiles
      ADD COLUMN "availabilityStatus"
      BOOLEAN NOT NULL DEFAULT true
    `);
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE doctor_profiles
      DROP COLUMN "availabilityStatus"
    `);
  }
}