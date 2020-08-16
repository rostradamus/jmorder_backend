import { Exclude, Expose, Type } from "class-transformer";
import { Property } from "@tsed/common";
import { ItemIndexDto } from "./ItemDto";

@Exclude()
export class ClientGetDto {
  @Expose() @Property() id: number;
  @Expose() @Property() name: string;
  @Expose() @Property() archived: boolean;
  @Expose() @Property() phone: string;
  @Expose() @Property() createdAt: Date;
  @Expose() @Property() updatedAt: Date;

  @Expose()
  @Type(() => ItemIndexDto)
  @Property()
  items: ItemIndexDto[];
}

@Exclude()
export class ClientIndexDto {
  @Expose() @Property() id: number;
  @Expose() @Property() name: string;
  @Expose() @Property() archived: boolean;
  @Expose() @Property() phone: string;
}
