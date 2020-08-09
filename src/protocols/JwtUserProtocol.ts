import { Req } from "@tsed/common";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { JWT_USER } from "@services/jwt/JwtConstants";
import { JwtService } from "@services/jwt/JwtService";
import { User } from "@entity/User";
import { UserGetDto } from "@dto/UserDto";

@Protocol<StrategyOptions>({
  name: "jwt-user",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_USER.SECRET,
    issuer: JWT_USER.ISSUER,
    audience: JWT_USER.AUDIENCE,
    algorithms: [JWT_USER.ALGORITHM]
  }
})
export class JwtProtocol implements OnVerify {
  constructor(private jwtService: JwtService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any): Promise<UserGetDto | boolean> {
    const user = await User.findOne(jwtPayload.sub);
    return user ? user : false;
  }
}
