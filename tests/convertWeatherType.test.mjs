import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { weatherModule } from "./test-setup.mjs";

describe("convertWeatherType", () => {
  it("should convert day icons correctly", () => {
    assert.equal(weatherModule.convertWeatherType("01d"), "day-clear-sky");
    assert.equal(weatherModule.convertWeatherType("02d"), "day-few-clouds");
    assert.equal(weatherModule.convertWeatherType("03d"), "day-scattered-clouds");
    assert.equal(weatherModule.convertWeatherType("04d"), "day-broken-clouds");
    assert.equal(weatherModule.convertWeatherType("09d"), "day-shower-rain");
    assert.equal(weatherModule.convertWeatherType("10d"), "day-rain");
    assert.equal(weatherModule.convertWeatherType("11d"), "day-thunderstorm");
    assert.equal(weatherModule.convertWeatherType("13d"), "day-snow");
    assert.equal(weatherModule.convertWeatherType("50d"), "day-mist");
  });

  it("should convert night icons correctly", () => {
    assert.equal(weatherModule.convertWeatherType("01n"), "night-clear-sky");
    assert.equal(weatherModule.convertWeatherType("02n"), "night-few-clouds");
    assert.equal(weatherModule.convertWeatherType("03n"), "night-scattered-clouds");
    assert.equal(weatherModule.convertWeatherType("04n"), "night-broken-clouds");
    assert.equal(weatherModule.convertWeatherType("09n"), "night-shower-rain");
    assert.equal(weatherModule.convertWeatherType("10n"), "night-rain");
    assert.equal(weatherModule.convertWeatherType("11n"), "night-thunderstorm");
    assert.equal(weatherModule.convertWeatherType("13n"), "night-snow");
    assert.equal(weatherModule.convertWeatherType("50n"), "night-mist");
  });

  it("should return null for unknown weather types", () => {
    assert.equal(weatherModule.convertWeatherType("99x"), null);
    assert.equal(weatherModule.convertWeatherType(""), null);
    assert.equal(weatherModule.convertWeatherType("invalid"), null);
  });

  it("should handle undefined input", () => {
    assert.equal(weatherModule.convertWeatherType(undefined), null);
  });
});
