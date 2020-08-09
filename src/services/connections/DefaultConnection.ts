import { Configuration, registerProvider } from "@tsed/di";
import { createConnection } from "@tsed/typeorm";
import { Connection, ConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const DEFAULT_CONNECTION = Symbol.for("DEFAULT_CONNECTION");
export type DEFAULT_CONNECTION = Connection;

registerProvider({
  provide: DEFAULT_CONNECTION,
  deps: [Configuration],
  async useAsyncFactory(configuration: Configuration) {
    const settings = configuration.get<ConnectionOptions[]>("typeorm");
    const connectionOptions = settings.find((o) => o.name === "default");

    return createConnection(
      Object.assign(connectionOptions, {
        namingStrategy: new SnakeNamingStrategy()
      })
    );
  }
});
