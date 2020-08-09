import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/passport";
import "@tsed/platform-express"; // /!\ keep this import
import "reflect-metadata";
import { GlobalAcceptMimesMiddleware } from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/typeorm";
import typeormConfig from "@config/typeorm";
import * as dotenv from "dotenv";

export const configs = dotenv.config();
export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/api": [`${rootDir}/controllers/**/*.ts`]
  },
  swagger: [
    {
      path: "/docs"
    }
  ],
  typeorm: typeormConfig,
  exclude: ["**/*.spec.ts"],
  componentsScan: [`${rootDir}/protocols/*{.ts,.js}`],
  passport: {}
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );
  }
}
