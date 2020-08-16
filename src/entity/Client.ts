import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";
import { Required, MaxLength, Property } from "@tsed/common";
import { Order } from "./Order";
import { Item } from "./Item";

@Entity({ name: "clients" })
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Required()
  @MaxLength(100)
  name: string;

  @Column()
  archived: boolean;

  @Column()
  @Property()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToMany(() => Item, (item) => item.client, { eager: true })
  items: Item[];

  public archive(): void {
    this.archived = true;
  }
}
