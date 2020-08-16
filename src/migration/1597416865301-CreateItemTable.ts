import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateItemTable1597416865301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "client_id",
            type: "int",
            isNullable: false
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "unit_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "quantity_name",
            type: "varchar",
            isNullable: false,
            default: "'개'"
          },
          {
            name: "comment",
            type: "varchar",
            isNullable: true
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
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["client_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "clients",
            onDelete: "CASCADE"
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("items");
  }
}
