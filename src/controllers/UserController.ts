import { Controller, Post, BodyParams, Get, Patch, PathParams } from "@tsed/common";
import { User } from "@entity/User";
import { ReturnsArray, Returns } from "@tsed/swagger";
import { NotFound } from "@tsed/exceptions";
import { UserGetDto, UserGetMultipleDto } from "@dto/UserDto";
import { plainToClass } from "class-transformer";
import { OK, NOT_FOUND } from "http-status-codes";

@Controller("/users")
export class UserController {
  @Post("/")
  @Returns(UserGetDto)
  async create(@BodyParams() user: User): Promise<UserGetDto | null> {
    return plainToClass(UserGetDto, await user.save());
  }

  @Get("/")
  @ReturnsArray(UserGetMultipleDto)
  async getList(): Promise<UserGetMultipleDto[]> {
    const users: User[] = await User.find();
    return plainToClass(UserGetMultipleDto, users);
  }

  @Get("/:id")
  @Returns(NOT_FOUND, { description: "Not found" })
  @Returns(OK, { description: "OK", type: UserGetDto })
  async get(@PathParams("id") id: string): Promise<UserGetDto | undefined> {
    const user: User | undefined = await User.findOne(id);
    if (!user) throw new NotFound("Not found");
    return plainToClass(UserGetDto, user);
  }

  @Patch("/:id")
  async update(@PathParams("id") id: string): Promise<UserGetDto | undefined> {
    return await User.findOne(id);
  }
}
