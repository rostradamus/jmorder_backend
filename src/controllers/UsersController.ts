import { Controller, Post, BodyParams, Get, PathParams } from "@tsed/common";
import { User } from "@entity/User";
import { ReturnsArray, Returns } from "@tsed/swagger";
import { NotFound } from "@tsed/exceptions";
import { UserGetDto, UserIndexDto } from "@dto/UserDto";
import { plainToClass } from "class-transformer";
import { OK, NOT_FOUND } from "http-status-codes";
import { Authenticate } from "@tsed/passport";

@Controller("/users")
@Authenticate("jwt-user")
export class UsersController {
  @Get("/")
  @ReturnsArray(UserIndexDto)
  async getList(): Promise<UserIndexDto[]> {
    const users: User[] = await User.find();
    return plainToClass(UserIndexDto, users);
  }

  @Get("/:id")
  @Returns(NOT_FOUND, { description: "Not found" })
  @Returns(OK, { description: "OK", type: UserGetDto })
  async get(@PathParams("id") id: string): Promise<UserGetDto | undefined> {
    const user: User | undefined = await User.findOne(id);
    if (!user) throw new NotFound("Not found");
    return plainToClass(UserGetDto, user);
  }

  @Post("/")
  @Returns(UserGetDto)
  async create(@BodyParams() user: User): Promise<UserGetDto | null> {
    await user.hashPassword();
    return plainToClass(UserGetDto, await user.save());
  }
}
