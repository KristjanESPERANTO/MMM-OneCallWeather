import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getWindSpeedFactor } from "../core/utils.mjs";

describe("getWindSpeedFactor", () => {
  describe("Imperial API units (mph from API)", () => {
    it("should return 1 for mph → mph (no conversion)", () => {
      assert.equal(getWindSpeedFactor("imperial", "mph"), 1);
    });

    it("should return 1.60934 for mph → km/h", () => {
      assert.equal(getWindSpeedFactor("imperial", "kmph"), 1.60934);
    });

    it("should return 0.44704 for mph → m/s", () => {
      assert.equal(getWindSpeedFactor("imperial", "ms"), 0.44704);
    });
  });

  describe("Metric API units (m/s from API)", () => {
    it("should return 2.237 for m/s → mph", () => {
      assert.equal(getWindSpeedFactor("metric", "mph"), 2.237);
    });

    it("should return 3.6 for m/s → km/h", () => {
      assert.equal(getWindSpeedFactor("metric", "kmph"), 3.6);
    });

    it("should return 1 for m/s → m/s (no conversion)", () => {
      assert.equal(getWindSpeedFactor("metric", "ms"), 1);
    });
  });

  describe("Standard API units (m/s from API)", () => {
    it("should return 2.237 for m/s → mph", () => {
      assert.equal(getWindSpeedFactor("standard", "mph"), 2.237);
    });

    it("should return 3.6 for m/s → km/h", () => {
      assert.equal(getWindSpeedFactor("standard", "kmph"), 3.6);
    });

    it("should return 1 for m/s → m/s (no conversion)", () => {
      assert.equal(getWindSpeedFactor("standard", "ms"), 1);
    });
  });

  describe("Real-world scenario (Issue #30)", () => {
    it("should fix the bug: imperial + mph should not double the speed", () => {
      // Mph from API
      const apiWindSpeed = 18,
        factor = getWindSpeedFactor("imperial", "mph"),
        result = apiWindSpeed * factor;
      // Should be 18, not 41 (18 * 2.237)
      assert.equal(result, 18);
    });

    it("should correctly convert metric m/s to mph", () => {
      // M/s from API
      const apiWindSpeed = 5,
        factor = getWindSpeedFactor("metric", "mph"),
        result = (apiWindSpeed * factor).toFixed(1);
      // 5 m/s ≈ 11.2 mph
      assert.equal(result, "11.2");
    });

    it("should correctly convert imperial mph to km/h", () => {
      // Mph from API
      const apiWindSpeed = 10,
        factor = getWindSpeedFactor("imperial", "kmph"),
        result = (apiWindSpeed * factor).toFixed(1);
      // 10 mph ≈ 16.1 km/h
      assert.equal(result, "16.1");
    });
  });
});
