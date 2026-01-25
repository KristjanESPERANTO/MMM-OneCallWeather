import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { roundValue } from "../core/utils.mjs";

describe("roundValue", () => {
  it("should round to 1 decimal when roundTemp is false", () => {
    assert.equal(roundValue(23.456, false), "23.5");
    assert.equal(roundValue(23.444, false), "23.4");
  });

  it("should round to integer when roundTemp is true", () => {
    assert.equal(roundValue(23.456, true), "23");
    assert.equal(roundValue(23.6, true), "24");
  });

  it("should handle negative temperatures", () => {
    assert.equal(roundValue(-5.67, false), "-5.7");
    assert.equal(roundValue(-5.67, true), "-6");
  });

  it("should handle zero", () => {
    assert.equal(roundValue(0, false), "0.0");
    assert.equal(roundValue(0, true), "0");
  });
});
