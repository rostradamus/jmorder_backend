import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1596792759047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: false
          },
          {
            name: "phone",
            type: "varchar",
            isUnique: true,
            isNullable: false
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false
          },
          {
            name: "is_email_verified",
            type: "boolean",
            default: false
          },
          {
            name: "is_phone_verified",
            type: "boolean",
            default: false
          },
          {
            name: "first_name",
            type: "varchar"
          },
          {
            name: "last_name",
            type: "varchar"
          },
          {
            name: "archived",
            type: "boolean",
            default: false
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            isNullable: false
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
