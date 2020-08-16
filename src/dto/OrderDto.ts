import { Exclude, Expose, Type } from "class-transformer";
import { Property } from "@tsed/common";
import { UserGetDto, UserIndexDto } from "./UserDto";
import { ClientIndexDto, ClientGetDto } from "./ClientDto";

@Exclude()
export class OrderGetDto {
  @Expose() @Property() id: string;

  @Expose()
  @Type(() => UserGetDto)
  @Property()
  user: UserGetDto;

  @Expose()
  @Type(() => ClientGetDto)
  @Property()
  client: ClientGetDto;

  @Expose() @Property() createdAt: Date;
  @Expose() @Property() updatedAt: Date;
}

@Exclude()
export class OrderIndexDto {
  @Expose() @Property() id: string;

  @Expose()
  @Type(() => UserIndexDto)
  @Property()
  user: UserIndexDto;

  @Expose()
  @Type(() => ClientIndexDto)
  @Property()
  client: ClientIndexDto;

  @Expose() @Property() createdAt: Date;
}
