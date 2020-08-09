import { Controller, Post, ProviderScope, Req, Scope, BodyParams } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { Unauthorized } from "@tsed/exceptions";
import { UserGetDto } from "@dto/UserDto";
import { JwtService } from "@services/jwt/JwtService";
import { Exclude, Expose, plainToClass } from "class-transformer";
import { JWT_USER } from "@services/jwt/JwtConstants";
import { User } from "@entity/User";

@Controller("/auth")
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  @Post("/")
  @Authenticate("login-local")
  async login(@Req() req: Req): Promise<AuthPayload> {
    const user = <UserGetDto>req.user;
    if (user === undefined) throw new Unauthorized("Failed to authorize");
    const token = await JwtService.sign({ sub: user.id });
    return new AuthPayload(user.id, token, JWT_USER.TYPE, user.email, user);
  }

  @Post("/refresh_token")
  @Authenticate("jwt-user")
  async refreshToken(@Req() req: Req): Promise<AuthPayload> {
    const user = <UserGetDto>req.user;
    if (user === undefined) throw new Unauthorized("Failed to authorize");
    const token = await JwtService.sign({ sub: user.id });
    return new AuthPayload(user.id, token, JWT_USER.TYPE, user.email, user);
  }

  @Post("/register")
  async register(@BodyParams() user: User): Promise<UserGetDto | null> {
    await user.hashPassword();
    return plainToClass(UserGetDto, await user.save());
  }
}

@Exclude()
class AuthPayload {
  @Expose() id: number;
  @Expose() token: string;
  @Expose() type: string;
  @Expose() email: string;
  @Expose() user: UserGetDto;

  constructor(id: number, token: string, type: string, email: string, user: UserGetDto) {
    this.id = id;
    this.token = token;
    this.type = type;
    this.email = email;
    this.user = user;
  }
}
