import { expect } from "chai";
import { PlatformTest } from "@tsed/common";
import * as SuperTest from "supertest";
import { HealthController } from "./HealthController";
import { Server } from "../Server";

describe("HealthController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": HealthController
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /hello-world", async () => {
    const response = await request.get("/hello-world").expect(200);

    expect(response.text).to.eq("hello");
  });
});
