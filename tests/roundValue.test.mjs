import { beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { weatherModule } from "./test-setup.mjs";

describe("roundValue", () => {
  beforeEach(() => {
    weatherModule.config = { roundTemp: false };
  });

  it("should round to 1 decimal when roundTemp is false", () => {
    assert.equal(weatherModule.roundValue(23.456), "23.5");
    assert.equal(weatherModule.roundValue(23.444), "23.4");
  });

  it("should round to integer when roundTemp is true", () => {
    weatherModule.config = { roundTemp: true };
    assert.equal(weatherModule.roundValue(23.456), "23");
    assert.equal(weatherModule.roundValue(23.6), "24");
  });

  it("should handle negative temperatures", () => {
    weatherModule.config = { roundTemp: false };
    assert.equal(weatherModule.roundValue(-5.67), "-5.7");

    weatherModule.config = { roundTemp: true };
    assert.equal(weatherModule.roundValue(-5.67), "-6");
  });

  it("should handle zero", () => {
    weatherModule.config = { roundTemp: false };
    assert.equal(weatherModule.roundValue(0), "0.0");

    weatherModule.config = { roundTemp: true };
    assert.equal(weatherModule.roundValue(0), "0");
  });
});
