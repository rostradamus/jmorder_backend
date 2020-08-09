import { Controller, Post, ProviderScope, Req, Scope } from "@tsed/common";
import { Authenticate } from "@tsed/passport";

@Controller("/login")
@Scope(ProviderScope.SINGLETON)
export class PassportController {
  @Post("/")
  @Authenticate("local-user")
  login(@Req() req: Req): Express.User {
    // FACADE
    return <Express.User>req.user;
  }
}
