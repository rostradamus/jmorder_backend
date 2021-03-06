import { BodyParams, Req } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { User } from "@entity/User";
import { plainToClass } from "class-transformer";
import { UserGetDto } from "@dto/UserDto";
import { Unauthorized } from "@tsed/exceptions";

interface Credentials {
  readonly email: string;
  readonly password: string;
}
@Protocol<IStrategyOptions>({
  name: "login-local",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials): Promise<UserGetDto> {
    const { email, password } = credentials;
    const user = await User.findOne({ email });

    if (!user || !(await user.verifyPassword(password))) {
      throw new Unauthorized("Wrong credentials");
    }

    return plainToClass(UserGetDto, user);
  }

  $onInstall(): void {
    // intercept the strategy instance to adding extra configuration
  }
}
