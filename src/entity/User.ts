import { MaxLength, Required, Email } from "@tsed/common";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { hash, compare } from "bcrypt";
import { Order } from "./Order";

@Entity({ name: "users" })
export class User extends BaseEntity {
  private static SALT_ROUNDS = 10;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Required()
  @Email()
  email: string;

  @Column()
  @Required()
  phone: string;

  @Column()
  @Required()
  password: string;

  @Column()
  isEmailVerified: boolean;

  @Column()
  isPhoneVerified: boolean;

  @Column()
  @MaxLength(100)
  @Required()
  firstName: string;

  @Column()
  @MaxLength(100)
  @Required()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  /**
   * hashPassword
   */
  public async hashPassword(): Promise<void> {
    this.password = await hash(this.password, User.SALT_ROUNDS);
  }

  /**
   * verifyPassword
   */
  public verifyPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
