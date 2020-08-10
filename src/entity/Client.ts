import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { Required, MaxLength, Property } from "@tsed/common";

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

  public archive(): void {
    this.archived = false;
  }
}
