import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { weatherModule } from "./test-setup.mjs";

describe("getOrdinal", () => {
  it("should return N for 0 degrees", () => {
    assert.equal(weatherModule.getOrdinal(0), "N");
  });

  it("should return N for 360 degrees", () => {
    assert.equal(weatherModule.getOrdinal(360), "N");
  });

  it("should return NNE for 22.5 degrees", () => {
    assert.equal(weatherModule.getOrdinal(22.5), "NNE");
  });

  it("should return NE for 45 degrees", () => {
    assert.equal(weatherModule.getOrdinal(45), "NE");
  });

  it("should return E for 90 degrees", () => {
    assert.equal(weatherModule.getOrdinal(90), "E");
  });

  it("should return SE for 135 degrees", () => {
    assert.equal(weatherModule.getOrdinal(135), "SE");
  });

  it("should return S for 180 degrees", () => {
    assert.equal(weatherModule.getOrdinal(180), "S");
  });

  it("should return SW for 225 degrees", () => {
    assert.equal(weatherModule.getOrdinal(225), "SW");
  });

  it("should return W for 270 degrees", () => {
    assert.equal(weatherModule.getOrdinal(270), "W");
  });

  it("should return NW for 315 degrees", () => {
    assert.equal(weatherModule.getOrdinal(315), "NW");
  });

  it("should handle values between cardinal directions", () => {
    assert.equal(weatherModule.getOrdinal(11), "N");
    assert.equal(weatherModule.getOrdinal(12), "NNE");
  });

  it("should handle large bearing values via modulo", () => {
    assert.equal(weatherModule.getOrdinal(720), "N"); // 720 % 360 = 0
    assert.equal(weatherModule.getOrdinal(405), "NE"); // 405 % 360 = 45
  });
});
