import { Expose, Exclude } from "class-transformer";
import { Property } from "@tsed/common";

@Exclude()
export class ItemGetDto {
  @Expose() @Property() id: number;

  @Expose() @Property() name: string;

  @Expose() @Property() unitName: string;

  @Expose() @Property() quantityName: string;

  @Expose() @Property() comment: string;
}

@Exclude()
export class ItemIndexDto {
  @Expose() @Property() id: number;

  @Expose() @Property() name: string;

  @Expose() @Property() unitName: string;

  @Expose() @Property() quantityName: string;
}
