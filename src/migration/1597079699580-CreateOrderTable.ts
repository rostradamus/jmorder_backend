import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderTable1597079699580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false
          },
          {
            name: "client_id",
            type: "int",
            isNullable: false
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
    await queryRunner.createForeignKeys("orders", [
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      }),
      new TableForeignKey({
        columnNames: ["client_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "clients",
        onDelete: "CASCADE"
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
