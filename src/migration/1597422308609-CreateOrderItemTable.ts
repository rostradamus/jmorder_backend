import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderItemTable1597422308609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "order_id",
            type: "int",
            isNullable: false
          },
          {
            name: "item_id",
            type: "int",
            isNullable: false
          },
          {
            name: "unit_amount",
            type: "float",
            isNullable: true
          },
          {
            name: "quantity",
            type: "int",
            isNullable: false
          },
          {
            name: "comment",
            type: "varchar",
            isNullable: true
          }
        ],
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["order_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "orders",
            onDelete: "CASCADE"
          }),
          new TableForeignKey({
            columnNames: ["item_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "items",
            onDelete: "CASCADE"
          })
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("order_items");
  }
}
