import { expect } from "chai";
import { PlatformTest } from "@tsed/common";
import { HealthController } from "./HealthController";

describe("HealthController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<HealthController>(HealthController);
    // const instance = PlatformTest.invoke<HealthController>(HealthController); // get fresh instance

    expect(instance).to.be.instanceof(HealthController);
  });
});
