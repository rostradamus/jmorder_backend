// @tsed/cli do not edit
import * as defaultConfig from "./default.config.json";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
const config = Object.assign(defaultConfig, { namingStrategy: new SnakeNamingStrategy() });

export default [config as any];
