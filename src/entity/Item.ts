import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Client } from "./Client";
import { Required, Property } from "@tsed/common";

@Entity({ name: "items" })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @Required()
  name: string;

  @Column()
  @Property()
  unitName: string;

  @Column()
  @Property()
  quantityName: string;

  @Column()
  @Property()
  comment: string;

  @ManyToOne(() => Client, (client) => client.items)
  @JoinColumn()
  client: Client | number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
