import { MaxLength, Required, Email } from "@tsed/common";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
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

  /**
   * verifyPassword
   */
  public verifyPassword(password: string): boolean {
    return this.password === password;
  }
}
