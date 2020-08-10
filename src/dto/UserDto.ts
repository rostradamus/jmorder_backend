import { Expose, Exclude } from "class-transformer";
import { Property } from "@tsed/common";

@Exclude()
export class UserGetDto {
  @Expose() @Property() id: number;
  @Expose() @Property() email: string;
  @Expose() @Property() phone: string;
  @Expose() @Property() firstName: string;
  @Expose() @Property() lastName: string;
  @Expose() @Property() createdAt: Date;
  @Expose() @Property() updatedAt: Date;
}

@Exclude()
export class UserIndexDto {
  @Expose() @Property() id: number;
  @Expose() @Property() email: string;
  @Expose() @Property() firstName: string;
  @Expose() @Property() lastName: string;
}
