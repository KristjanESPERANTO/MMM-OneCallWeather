/**
 * Pure utility functions for weather data processing.
 * These functions have no side effects and can be tested independently.
 */

/* eslint-disable func-style, no-ternary, max-statements, complexity, one-var */

/**
 * Converts mph to Beaufort scale (wind speed).
 *
 * @see https://www.spc.noaa.gov/faq/tornado/beaufort.html
 * @see https://en.wikipedia.org/wiki/Beaufort_scale#Modern_scale
 *
 * @param {number} mph - Wind speed in mph.
 * @returns {number} Wind speed in Beaufort scale (0-12).
 */
export function mph2Beaufort(mph) {
  const kmh = mph * 1.60934;
  const speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
  for (const [beaufort, speed] of speeds.entries()) {
    if (speed > kmh) {
      return beaufort;
    }
  }
  return 12;
}

/**
 * Round temperature value based on configuration.
 *
 * @param {number} temperature - Temperature value to round.
 * @param {boolean} roundTemp - Whether to round to integer (true) or 1 decimal (false).
 * @returns {string} Rounded temperature as string.
 */
export function roundValue(temperature, roundTemp) {
  const decimals = roundTemp ? 0 : 1;
  return parseFloat(temperature).toFixed(decimals);
}

/**
 * Convert wind direction in degrees to cardinal direction abbreviation.
 *
 * @param {number} windDir - Wind direction in degrees (0-360).
 * @returns {string} Cardinal direction (N, NNE, NE, etc.).
 */
export function cardinalWindDirection(windDir) {
  if (windDir > 11.25 && windDir <= 33.75) {
    return "NNE";
  }
  if (windDir > 33.75 && windDir <= 56.25) {
    return "NE";
  }
  if (windDir > 56.25 && windDir <= 78.75) {
    return "ENE";
  }
  if (windDir > 78.75 && windDir <= 101.25) {
    return "E";
  }
  if (windDir > 101.25 && windDir <= 123.75) {
    return "ESE";
  }
  if (windDir > 123.75 && windDir <= 146.25) {
    return "SE";
  }
  if (windDir > 146.25 && windDir <= 168.75) {
    return "SSE";
  }
  if (windDir > 168.75 && windDir <= 191.25) {
    return "S";
  }
  if (windDir > 191.25 && windDir <= 213.75) {
    return "SSW";
  }
  if (windDir > 213.75 && windDir <= 236.25) {
    return "SW";
  }
  if (windDir > 236.25 && windDir <= 258.75) {
    return "WSW";
  }
  if (windDir > 258.75 && windDir <= 281.25) {
    return "W";
  }
  if (windDir > 281.25 && windDir <= 303.75) {
    return "WNW";
  }
  if (windDir > 303.75 && windDir <= 326.25) {
    return "NW";
  }
  if (windDir > 326.25 && windDir <= 348.75) {
    return "NNW";
  }
  return "N";
}

/**
 * Convert OpenWeatherMap icon code to a more descriptive name.
 *
 * @param {string} weatherType - OpenWeatherMap icon code (e.g., "01d", "10n").
 * @returns {string|null} Descriptive weather type name or null if unknown.
 */
export function convertWeatherType(weatherType) {
  const weatherTypes = {
    "01d": "day-clear-sky",
    "02d": "day-few-clouds",
    "03d": "day-scattered-clouds",
    "04d": "day-broken-clouds",
    "09d": "day-shower-rain",
    "10d": "day-rain",
    "11d": "day-thunderstorm",
    "13d": "day-snow",
    "50d": "day-mist",
    "01n": "night-clear-sky",
    "02n": "night-few-clouds",
    "03n": "night-scattered-clouds",
    "04n": "night-broken-clouds",
    "09n": "night-shower-rain",
    "10n": "night-rain",
    "11n": "night-thunderstorm",
    "13n": "night-snow",
    "50n": "night-mist"
  };

  return Object.hasOwn(weatherTypes, weatherType)
    ? weatherTypes[weatherType]
    : null;
}

/**
 * Get ordinal wind direction label from bearing.
 *
 * @param {number} bearing - Wind bearing in degrees (0-360).
 * @param {string[]} labelOrdinals - Array of 16 ordinal labels (N, NNE, NE, ...).
 * @returns {string} Ordinal label from the array.
 */
export function getOrdinal(bearing, labelOrdinals) {
  return labelOrdinals[Math.round(bearing * 16 / 360) % 16];
}
