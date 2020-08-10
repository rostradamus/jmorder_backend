import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientTable1597069667378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clients",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "archived",
            type: "boolean",
            default: false
          },
          {
            name: "phone",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()"
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients");
  }
}
