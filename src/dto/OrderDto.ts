import { Exclude, Expose } from "class-transformer";
import { Property } from "@tsed/common";
import { UserGetDto, UserIndexDto } from "./UserDto";
import { ClientIndexDto, ClientGetDto } from "./ClientDto";

@Exclude()
export class OrderGetDto {
  @Expose() @Property() id: string;

  @Expose({ toClassOnly: true })
  @Property()
  user: UserGetDto;

  @Expose({ toClassOnly: true })
  @Property()
  client: ClientGetDto;

  @Expose() @Property() createdAt: Date;
  @Expose() @Property() updatedAt: Date;
}

export class OrderIndexDto {
  @Expose() @Property() id: string;

  @Expose({ toClassOnly: true })
  @Property()
  user: UserIndexDto;

  @Expose({ toClassOnly: true })
  @Property()
  client: ClientIndexDto;

  @Expose() @Property() createdAt: Date;
}
