import { Exclude, Expose } from "class-transformer";
import { Property } from "@tsed/common";

@Exclude()
export class ClientGetDto {
  @Expose() @Property() id: number;
  @Expose() @Property() name: string;
  @Expose() @Property() archived: boolean;
  @Expose() @Property() phone: string;
  @Expose() @Property() createdAt: Date;
  @Expose() @Property() updatedAt: Date;
}

@Exclude()
export class ClientIndexDto {
  @Expose() @Property() id: number;
  @Expose() @Property() name: string;
  @Expose() @Property() archived: boolean;
  @Expose() @Property() phone: string;
}
