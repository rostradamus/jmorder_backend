import { JWT_USER } from "./JwtConstants";
import * as jwt from "jsonwebtoken";
import { $log, Service } from "@tsed/common";

@Service()
export class JwtService {
  public static async sign(payload: string | Buffer | Record<string, unknown>, options = {}): Promise<string> {
    options = Object.assign(
      {
        algorithm: JWT_USER.ALGORITHM,
        expiresIn: JWT_USER.EXPIRATION,
        issuer: JWT_USER.ISSUER,
        audience: JWT_USER.AUDIENCE
      },
      options
    );
    $log.debug(`jwt sign.\npayload: ${JSON.stringify(payload)}\noptions: ${JSON.stringify(options)}`);
    return jwt.sign(payload, JWT_USER.SECRET, options);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static async verify(token: string, options = {}): Promise<object | string> {
    options = Object.assign(
      {
        algorithm: [JWT_USER.ALGORITHM],
        issuer: JWT_USER.ISSUER,
        audience: JWT_USER.AUDIENCE
      },
      options
    );
    return jwt.verify(token, JWT_USER.SECRET, options);
  }

  public static decode(token: string): null | { [key: string]: unknown } | string {
    return jwt.decode(token);
  }
}
