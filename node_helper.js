/*
 * Node Helper for MMM-OneCallWeather.
 *
 * This helper is responsible for the data pull from OpenWeather.
 * At a minimum the API key, Latitude and Longitude parameters
 * must be provided.  If any of these are missing, the request
 * to OpenWeather will not be executed, and instead an error
 * will be output the the MagicMirror log.
 *
 * Additional, this module supplies two optional parameters:
 *
 *  units - one of "metric", "imperial", or "" (blank)
 *  lang - Any of the languages OpenWeather supports, as listed here: https://openweathermap.org/api/one-call-api#multi
 */

const NodeHelper = require("node_helper");
const Log = require("logger");
const dayjs = require("dayjs");

module.exports = NodeHelper.create({

  socketNotificationReceived (notification, config) {
    if (notification === "OPENWEATHER_ONECALL_GET") {
      const self = this;
      Log.debug("[MMM-OneCallWeather] node received");
      if (config.apikey === null || config.apikey === "") {
        Log.debug(`[MMM-OneCallWeather] ${dayjs().format("D-MMM-YY HH:mm")} ** ERROR ** No API key configured. Get an API key at https://openweathermap.org/api/one-call-api`);
      } else if (
        config.latitude === null ||
        config.latitude === "" ||
        config.longitude === null ||
        config.longitude === ""
      ) {
        Log.debug(`[MMM-OneCallWeather] ${dayjs().format("D-MMM-YY HH:mm")} ** ERROR ** Latitude and/or longitude not provided.`);
      } else {
        const myUrl =
          `https://api.openweathermap.org/data/${config.apiVersion}/onecall` +
          `?lat=${config.latitude}&lon=${config.longitude}${
            config.units === ""
              ? ""
              : `&units=${config.units}`
          }&exclude=${config.exclude}&appid=${config.apikey}&lang=${
            config.language
          }`;

        // make request to OpenWeather One Call API

        fetch(myUrl)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((data) => {
            // handle success
            Log.debug(`[MMM-OneCallWeather] got request loop ${myUrl}`);
            self.sendSocketNotification("OPENWEATHER_ONECALL_DATA", data);
            Log.debug("[MMM-OneCallWeather] sent the data back");
          })
          .catch((error) => {
            // handle error
            Log.error(`[MMM-OneCallWeather] ${dayjs().format("D-MMM-YY HH:mm")} ** ERROR ** ${error}`);
          });
      }
    }
  }
});
