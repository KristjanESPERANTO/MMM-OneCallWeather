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
 */

const NodeHelper = require('node_helper')
const Log = require('logger')

module.exports = NodeHelper.create({

  socketNotificationReceived(notification, config) {
    if (notification === 'OPENWEATHER_ONECALL_GET') {
      const that = this
      Log.debug('[MMM-OneCallWeather] node received')
      if (config.apikey === null || config.apikey === '') {
        Log.error('[MMM-OneCallWeather] No API key configured. Get an API key at https://openweathermap.org/api/one-call-api')
      }
      else if (
        config.latitude === null
        || config.latitude === ''
        || config.longitude === null
        || config.longitude === ''
      ) {
        Log.error('[MMM-OneCallWeather] Latitude and/or longitude not provided.')
      }
      else {
        const myUrl = `https://api.openweathermap.org/data/${config.apiVersion}/onecall?lat=${config.latitude}&lon=${config.longitude}${config.units === '' ? '' : `&units=${config.units}`}&exclude=${config.exclude}&appid=${config.apikey}&lang=${config.language}`

        fetch(myUrl)
          .then((response) => {
            if (response.status === 200) {
              return response.json()
            }
            throw new Error(response.statusText)
          })
          .then((data) => {
            // handle success
            Log.debug(`[MMM-OneCallWeather] got request loop ${myUrl}`)

            // Inject demo alert for testing if DEMO_ALERT env var is set
            if (process.env.DEMO_ALERT === '1' && data.current && !data.alerts) {
              const now = Math.floor(Date.now() / 1000)
              data.alerts = [
                {
                  event: 'Winter Weather Advisory',
                  start: now - 3600,
                  end: now + 28800,
                  description: '* WHAT...Two periods of accumulating lake effect snow expected. Total snow accumulations could locally exceed 5 inches, particularly near the lake.\n\n* WHERE...Northern regions.\n\n* WHEN...Until 8 PM CST this evening. For the second Winter Weather Advisory, from 6 AM to 4 PM CST Saturday.\n\n* IMPACTS...Roads, and especially bridges and overpasses, will likely become slick and hazardous. The hazardous conditions will impact this evenings commute.\n\n* ADDITIONAL DETAILS...Lake effect snow is expected to impact the area in two waves.',
                  tags: ['Snow/Ice'],
                },
              ]
              Log.info('[MMM-OneCallWeather] Demo alert injected')
            }

            that.sendSocketNotification('OPENWEATHER_ONECALL_DATA', {
              identifier: config.identifier,
              data,
            })
            Log.debug('[MMM-OneCallWeather] sent the data back')
          })
          .catch((error) => {
            // handle error
            Log.error(`[MMM-OneCallWeather] ${error}`)
          })
      }
    }
  },
})
