/*
 * MagicMirror²
 * Module: MMM-OneCallWeather
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * This class is the blueprint for a day which includes weather information.
 *
 * Currently this is focused on the information which is necessary for the current weather.
 * As soon as we start implementing the forecast, mode properties will be added.
 */
// eslint-disable-next-line no-unused-vars
class WeatherObject {
  constructor (units, tempUnits, windUnits, useKmh) {
    this.units = units;
    this.tempUnits = tempUnits;
    this.windUnits = windUnits;
    this.useKmh = useKmh;
    this.date = null;
    this.windSpeed = null;
    this.windDirection = null;
    this.sunrise = null;
    this.sunset = null;
    this.temperature = null;
    this.minTemperature = null;
    this.maxTemperature = null;
    this.weatherType = null;
    this.humidity = null;
    this.rain = null;
    this.snow = null;
    this.precipitation = null;
    this.feelsLikeTemp = null;
  }

  kmhWindSpeed () {
    const windInKmh =
      this.windUnits === "imperial"
        ? this.windSpeed * 1.609344
        : this.windSpeed * 60 * 60 / 1000;
    return windInKmh;
  }

  nextSunAction () {
    return dayjs().isBetween(this.sunrise, this.sunset)
      ? "sunset"
      : "sunrise";
  }

  feelsLike () {
    if (this.feelsLikeTemp) {
      return this.feelsLikeTemp;
    }
    const windInMph =
      this.windUnits === "imperial"
        ? this.windSpeed
        : this.windSpeed * 2.23694;
    const tempInF =
      this.tempUnits === "imperial"
        ? this.temperature
        : this.temperature * 9 / 5 + 32;
    let feelsLike = tempInF;

    if (windInMph > 3 && tempInF < 50) {
      feelsLike = Math.round(35.74 +
        0.6215 * tempInF -
        35.75 * windInMph ** 0.16 +
        0.4275 * tempInF * windInMph ** 0.16);
    } else if (tempInF > 80 && this.humidity > 40) {
      feelsLike =
        -42.379 +
        2.04901523 * tempInF +
        10.14333127 * this.humidity -
        0.22475541 * tempInF * this.humidity -
        6.83783 * 10 ** -3 * tempInF * tempInF -
        5.481717 * 10 ** -2 * this.humidity * this.humidity +
        1.22874 * 10 ** -3 * tempInF * tempInF * this.humidity +
        8.5282 * 10 ** -4 * tempInF * this.humidity * this.humidity -
        1.99 * 10 ** -6 * tempInF * tempInF * this.humidity * this.humidity;
    }

    return this.tempUnits === "imperial"
      ? feelsLike
      : (feelsLike - 32) * 5 / 9;
  }
}
