Module.register("MMM-OneCallWeather", {
  defaults: {
    latitude: false,
    longitude: false,
    apikey: "",
    apiVersion: "3.0",
    units: config.units,
    showRainAmount: false,
    showWind: true,
    showWindDirection: true,
    showFeelsLike: true,
    tempUnits: "c",
    windUnits: "mph",
    useBeaufortInCurrent: false,

    initialLoadDelay: 2500, // 2.5 seconds delay. This delay is used to keep the OpenWeather API happy.
    updateInterval: 10 * 60 * 1000, // every 10 minutes
    animationSpeed: 1000,
    updateFadeSpeed: 500,
    requestDelay: 0,

    decimalSymbol: ".",
    fade: true,
    scale: false,
    exclude: "minutely",

    tableClass: "small",
    iconset: "4a",
    iconsetFormat: "png",

    onlyTemp: false,
    maxHourliesToShow: 30,
    maxDailiesToShow: 6,
    colored: true,
    roundTemp: true,
    showCurrent: true,
    showForecast: true,
    showAlerts: false,
    forecastLayout: "columns", // "columns" (days as columns) or "rows" (days as rows)
    arrangement: "vertical", // "vertical" (forecast below current) or "horizontal" (forecast next to current)

    labelOrdinals: [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW"
    ],
    moduleTimestampIdPrefix: "OPENWEATHER_ONE_CALL_TIMESTAMP_"
  },

  // create a variable for the first upcoming calendar event. Used if no location is specified.
  firstEvent: false,

  // Define required CSS files.
  getStyles() {
    return ["MMM-OneCallWeather.css"];
  },

  // Define start sequence.
  start() {
    Log.info(`Starting module: ${this.name}`);
    this.forecast = [];
    this.loaded = false;
    this.scheduleUpdate(this.config.initialLoadDelay);
    this.updateTimer = null;
  },

  scheduleUpdate(delay) {
    let nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    const that = this;
    clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(() => {
      that.updateWeather();
    }, nextLoad);
  },

  updateWeather() {
    this.sendSocketNotification("OPENWEATHER_ONECALL_GET", {
      identifier: this.identifier,
      apikey: this.config.apikey,
      apiVersion: this.config.apiVersion,
      exclude: this.config.exclude,
      latitude: this.config.latitude,
      longitude: this.config.longitude,
      units: this.config.units,
      language: this.config.language,
      requestDelay: this.config.requestDelay
    });
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "OPENWEATHER_ONECALL_DATA" && payload.identifier === this.identifier) {
      // process weather data
      const { data } = payload;
      this.forecast = this.processOnecall(data);
      this.loaded = true;
      this.updateDom();
      this.scheduleUpdate();
    }
  },

  processOnecall(data) {
    let wsfactor = 2.237;
    const current = [];
    if (this.config.windUnits === "kmph") {
      wsfactor = 3.6;
    }
    else if (this.config.windUnits === "ms") {
      wsfactor = 1;
    }

    if (Object.hasOwn(data, "current")) {
      const currently = {
        date: new Date((data.current.dt + data.timezone_offset) * 1000),
        dayOfWeek: new Intl.DateTimeFormat(config.language, { weekday: "short" }).format(data.current.dt),
        windSpeed: (data.current.wind_speed * wsfactor).toFixed(0),
        windDirection: data.current.wind_deg,
        sunrise: new Date((data.current.sunrise + data.timezone_offset) * 1000),
        sunset: new Date((data.current.sunset + data.timezone_offset) * 1000),
        temperature: this.roundValue(data.current.temp),
        weatherIcon: data.current.weather[0].icon,
        weatherType: this.convertWeatherType(data.current.weather[0].icon),
        humidity: data.current.humidity,
        feelsLikeTemp: data.current.feels_like.toFixed(1),
        precipitation: this.config.units === "imperial"
          ? ((data.current.rain?.["1h"] || 0) + (data.current.snow?.["1h"] || 0)) / 25.4
          : (data.current.rain?.["1h"] || 0) + (data.current.snow?.["1h"] || 0)
      };

      if (Object.hasOwn(data, "alerts")) {
        currently.alerts = data.alerts;
      }
      else {
        currently.alerts = [];
      }

      current.push(currently);
      Log.debug(`current weather is ${JSON.stringify(currently)}`);
    }

    // get hourly weather, if requested
    const hours = [];
    this.hourForecast = [];
    let forecastData;

    if (Object.hasOwn(data, "hourly")) {
      for (const hour of data.hourly) {
        let rain = 0;
        let snow = 0;
        let precip = false;

        if (
          Object.hasOwn(hour, "rain")
          && !Number.isNaN(hour.rain["1h"])
        ) {
          if (this.config.units === "imperial") {
            rain = hour.rain["1h"] / 25.4;
          }
          else {
            rain = hour.rain["1h"];
          }
          precip = true;
        }
        if (
          Object.hasOwn(hour, "snow")
          && !Number.isNaN(hour.snow["1h"])
        ) {
          if (this.config.units === "imperial") {
            snow = hour.snow["1h"] / 25.4;
          }
          else {
            snow = hour.snow["1h"];
          }
          precip = true;
        }

        let precipitation = 0;
        if (precip) {
          precipitation = rain + snow;
        }

        forecastData = {
          date: new Date((hour.dt + data.timezone_offset) * 1000),
          temperature: hour.temp,
          humidity: hour.humidity,
          windSpeed: hour.wind_speed,
          windDirection: hour.wind_deg,
          feelsLikeTemp: hour.feels_like.day,
          weatherIcon: hour.weather[0].icon,
          weatherType: this.convertWeatherType(hour.weather[0].icon),
          precipitation
        };
        hours.push(forecastData);
      }
    }

    // get daily weather, if requested
    this.dayForecast = [];

    const days = [];
    if (Object.hasOwn(data, "daily")) {
      for (const day of data.daily) {
        let rain = 0;
        let snow = 0;
        let precip = false;

        if (!Number.isNaN(day.rain)) {
          const { rain: dayRain } = day;
          if (this.config.units === "imperial") {
            rain = dayRain / 25.4;
          }
          else {
            rain = dayRain;
          }
          precip = true;
        }
        if (!Number.isNaN(day.snow)) {
          const { snow: daySnow } = day;
          if (this.config.units === "imperial") {
            snow = daySnow / 25.4;
          }
          else {
            snow = daySnow;
          }
          precip = true;
        }

        let precipitation = 0;
        if (precip) {
          precipitation = rain + snow;
        }

        forecastData = {
          dayOfWeek: new Intl.DateTimeFormat(config.language, { weekday: "short" }).format(day.dt * 1000),
          date: new Date((day.dt + data.timezone_offset) * 1000),
          sunrise: new Date((day.sunrise + data.timezone_offset) * 1000),
          sunset: new Date((day.sunset + data.timezone_offset) * 1000),
          minTemperature: this.roundValue(day.temp.min),
          maxTemperature: this.roundValue(day.temp.max),
          humidity: day.humidity,
          windSpeed: (day.wind_speed * wsfactor).toFixed(0),
          windDirection: day.wind_deg,
          feelsLikeTemp: day.feels_like.day,
          weatherIcon: day.weather[0].icon,
          weatherType: this.convertWeatherType(day.weather[0].icon),
          precipitation
        };

        days.push(forecastData);
      }
    }

    // Log.debug("forecast is " + JSON.stringify(days));
    return { current,
      hours,
      days };
  },

  // Override dom generator.
  getDom() {
    const wrapper = document.createElement("div");

    if (this.config.apikey === "") {
      wrapper.innerHTML = `Please set the correct openweather <i>apikey</i> in the config for module: ${this.name}.`;
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.loaded) {
      wrapper.innerHTML = this.translate("LOADING");
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    let table = document.createElement("table");
    let currentWeather;
    let dailyForecast;
    table.className = this.config.tableClass;

    let degreeLabel = "°";
    if (this.config.scale) {
      switch (this.config.units) {
        case "metric":
          degreeLabel += "C";
          break;
        case "imperial":
          degreeLabel += "F";
          break;
        default:
          degreeLabel = "K";
          break;
      }
    }

    if (this.config.decimalSymbol === "") {
      this.config.decimalSymbol = ".";
    }

    // Forecast layout: "rows" - days as rows (vertical list)
    if (this.config.forecastLayout === "rows") {
      // eslint-disable-next-line prefer-destructuring
      currentWeather = this.forecast.current[0];

      if (this.config.showCurrent) {
        table = this.createCurrentWeatherBlock(currentWeather, "6", degreeLabel);
      }

      // Return early if only showing current weather
      if (!this.config.showForecast) {
        return table;
      }

      // Create separate forecast table for rows layout
      const forecastTable = document.createElement("table");
      forecastTable.className = "forecast-table small";

      for (let i = 0; i < this.config.maxDailiesToShow; i += 1) {
        dailyForecast = this.forecast.days[i];

        const row = document.createElement("tr");
        row.className = "vertical-row";

        if (this.config.colored) {
          row.className += " colored";
        }
        forecastTable.appendChild(row);

        const dayCell = document.createElement("td");
        dayCell.className = "day";
        dayCell.innerHTML = dailyForecast.dayOfWeek;
        row.appendChild(dayCell);

        const iconCell = document.createElement("td");
        iconCell.className = "bright weather-icon";
        const icon = document.createElement("span");
        const iconImg = document.createElement("img");
        iconImg.className = "forecast-icon";
        iconImg.src = `modules/MMM-OneCallWeather/icons/${this.config.iconset}/${dailyForecast.weatherIcon}.${this.config.iconsetFormat}`;

        icon.appendChild(iconImg);
        iconCell.appendChild(icon);
        row.appendChild(iconCell);

        const maxTempCell = document.createElement("td");
        maxTempCell.innerHTML = `${dailyForecast.maxTemperature}${degreeLabel}`;
        maxTempCell.className = "bright max-temp";
        row.appendChild(maxTempCell);

        const minTempCell = document.createElement("td");
        minTempCell.innerHTML = `${dailyForecast.minTemperature}${degreeLabel}`;
        minTempCell.className = "min-temp";
        row.appendChild(minTempCell);

        const windCell = document.createElement("td");
        windCell.className = "bright weather-icon";
        windCell.appendChild(this.createWindBadge(dailyForecast.windSpeed, dailyForecast.windDirection));
        row.appendChild(windCell);

        if (this.config.showRainAmount) {
          const rainCell = document.createElement("td");
          if (Number.isNaN(dailyForecast.precipitation)) {
            rainCell.innerHTML = "";
          }
          else if (config.units === "imperial") {
            rainCell.innerHTML = `${(
              parseFloat(dailyForecast.precipitation) / 25.4
            ).toFixed(2)} in`;
          }
          else {
            rainCell.innerHTML = `${parseFloat(dailyForecast.precipitation).toFixed(1)} mm`;
          }
          rainCell.className = "align-right bright rain";
          row.appendChild(rainCell);
        }
      }

      // Return forecast table only if not showing current weather
      if (!this.config.showCurrent) {
        return forecastTable;
      }

      // Both current and forecast are shown - create container with arrangement
      const weatherContainer = document.createElement("div");
      weatherContainer.className = this.config.arrangement === "horizontal"
        ? "weather-layout-horizontal"
        : "weather-layout-vertical";

      weatherContainer.appendChild(table);
      weatherContainer.appendChild(forecastTable);

      return weatherContainer;
    }

    // Forecast layout: "columns" - days as columns (default table layout)
    // eslint-disable-next-line prefer-destructuring
    currentWeather = this.forecast.current[0];

    if (this.config.showCurrent) {
      table = this.createCurrentWeatherBlock(
        currentWeather,
        this.config.maxDailiesToShow,
        degreeLabel
      );
    }

    // Return early if only showing current weather
    if (!this.config.showForecast) {
      return table;
    }

    // Create separate forecast table
    const forecastTable = document.createElement("table");
    forecastTable.className = "forecast-table small";

    // Same structure for both layouts - days as columns
    const dayRow = document.createElement("tr");
    const iconRow = document.createElement("tr");
    const maxTempRow = document.createElement("tr");
    const minTempRow = document.createElement("tr");
    const windRow = document.createElement("tr");
    const rainRow = this.config.showRainAmount
      ? document.createElement("tr")
      : null;

    for (let j = 0; j < this.config.maxDailiesToShow; j += 1) {
      dailyForecast = this.forecast.days[j];

      // Day cell
      const dayCell = document.createElement("td");
      dayCell.className = "day";
      if (this.config.colored) {
        dayCell.className += " colored";
      }
      dayCell.innerHTML = dailyForecast.dayOfWeek;
      dayRow.appendChild(dayCell);

      // Icon cell
      const iconCell = document.createElement("td");
      iconCell.className = "bright weather-icon";
      if (this.config.colored) {
        iconCell.className += " colored";
      }
      const icon = document.createElement("span");
      const iconImg = document.createElement("img");
      iconImg.className = "forecast-icon";
      iconImg.src = `modules/MMM-OneCallWeather/icons/${this.config.iconset}/${dailyForecast.weatherIcon}.${this.config.iconsetFormat}`;
      icon.appendChild(iconImg);
      iconCell.appendChild(icon);
      iconRow.appendChild(iconCell);

      if (
        this.config.decimalSymbol === ""
        || this.config.decimalSymbol === " "
      ) {
        this.config.decimalSymbol = ".";
      }

      // Max temp cell
      const maxTempCell = document.createElement("td");
      maxTempCell.innerHTML = `${dailyForecast.maxTemperature}${degreeLabel}`;
      maxTempCell.className = "bright max-temp";
      if (this.config.colored) {
        maxTempCell.className += " colored";
      }
      maxTempRow.appendChild(maxTempCell);

      // Min temp cell
      const minTempCell = document.createElement("td");
      if (this.config.tempUnits === "f") {
        minTempCell.innerHTML = ` ${(
          dailyForecast.minTemperature * (9 / 5)
          + 32
        ).toFixed(0)}${degreeLabel}`;
      }
      else {
        minTempCell.innerHTML = `${dailyForecast.minTemperature}${degreeLabel}`;
      }
      minTempCell.className = "min-temp";
      if (this.config.colored) {
        minTempCell.className += " colored";
      }
      minTempRow.appendChild(minTempCell);

      // Wind cell
      const windCell = document.createElement("td");
      windCell.className = "bright weather-icon";
      if (this.config.colored) {
        windCell.className += " colored";
      }
      windCell.appendChild(this.createWindBadge(dailyForecast.windSpeed, dailyForecast.windDirection));
      windRow.appendChild(windCell);

      // Rain cell
      if (this.config.showRainAmount) {
        const rainCell = document.createElement("td");
        if (Number.isNaN(dailyForecast.precipitation)) {
          rainCell.innerHTML = "";
        }
        else if (config.units === "imperial") {
          rainCell.innerHTML = `${(
            parseFloat(dailyForecast.precipitation) / 25.4
          ).toFixed(2)} in`;
        }
        else {
          rainCell.innerHTML = `${parseFloat(dailyForecast.precipitation).toFixed(1)} mm`;
        }
        rainCell.className = "align-right bright rain";
        if (this.config.colored) {
          rainCell.className += " colored";
        }
        rainRow.appendChild(rainCell);
      }
    }

    // Append all rows to forecast table
    forecastTable.appendChild(dayRow);
    forecastTable.appendChild(iconRow);
    forecastTable.appendChild(maxTempRow);
    forecastTable.appendChild(minTempRow);
    forecastTable.appendChild(windRow);
    if (this.config.showRainAmount) {
      forecastTable.appendChild(rainRow);
    }

    // Return forecast table only if not showing current weather
    if (!this.config.showCurrent) {
      return forecastTable;
    }

    // Create container with both current weather and forecast
    const weatherContainer = document.createElement("div");
    weatherContainer.className = this.config.arrangement === "horizontal"
      ? "weather-layout-horizontal"
      : "weather-layout-vertical";

    weatherContainer.appendChild(table);
    weatherContainer.appendChild(forecastTable);

    return weatherContainer;
  },

  // Helper method to create current weather block (reduces code duplication)
  createCurrentWeatherBlock(currentWeather, colspan, degreeLabel) {
    const table = document.createElement("table");
    table.className = this.config.tableClass;

    // Row 1: Wind information
    const currentRow1 = document.createElement("tr");
    const currentCell1 = document.createElement("td");
    currentCell1.colSpan = colspan;
    currentCell1.className = "current";

    const windContainer = document.createElement("div");
    windContainer.className = "wind-container normal medium";

    const windIcon = document.createElement("img");
    windIcon.className = "wi wind-icon dimmed";
    windIcon.src = "modules/MMM-OneCallWeather/icons/8a/wind.svg";
    windContainer.appendChild(windIcon);

    const windySpeed = document.createElement("span");
    if (this.config.useBeaufortInCurrent) {
      this.convSpd = this.mph2Beaufort(currentWeather.windSpeed);
      windySpeed.innerHTML = `F${this.convSpd}`;
    }
    else {
      windySpeed.innerHTML = ` ${currentWeather.windSpeed}`;
    }
    windContainer.appendChild(windySpeed);

    if (this.config.showWindDirection) {
      const windyDirection = document.createElement("sup");
      if (this.config.showWindDirectionAsArrow) {
        windyDirection.innerHTML = ` &nbsp;<i class="fa fa-long-arrow-down" style="transform:rotate(${currentWeather.windDirection}deg);"></i>&nbsp;`;
      }
      else {
        windyDirection.innerHTML = ` ${this.cardinalWindDirection(currentWeather.windDirection)}`;
      }
      windContainer.appendChild(windyDirection);
    }

    const spacer = document.createElement("span");
    spacer.innerHTML = "&nbsp;";
    windContainer.appendChild(spacer);

    currentCell1.appendChild(windContainer);
    currentRow1.appendChild(currentCell1);
    table.appendChild(currentRow1);

    // Row 2: Weather icon and temperature
    const currentRow2 = document.createElement("tr");
    const currentCell2 = document.createElement("td");
    currentCell2.colSpan = colspan;
    currentCell2.className = "current";

    const largeWeatherIcon = document.createElement("div");
    largeWeatherIcon.className = "large-weather-icon-container light";

    const weatherIcon = document.createElement("img");
    weatherIcon.className = `wi weathericon wi-${currentWeather.weatherIcon}`;
    weatherIcon.src = `modules/MMM-OneCallWeather/icons/${this.config.iconset}/${currentWeather.weatherIcon}.${this.config.iconsetFormat}`;
    largeWeatherIcon.appendChild(weatherIcon);

    let elementType = "span";
    if (this.config.forecastLayout === "rows") {
      elementType = "div";
    }
    const currTemperature = document.createElement(elementType);
    currTemperature.className = "large bright";
    if (this.config.tempUnits === "f") {
      currTemperature.innerHTML = ` ${(
        currentWeather.temperature * (9 / 5)
        + 32
      ).toFixed(0)}${degreeLabel}`;
    }
    else {
      currTemperature.innerHTML = ` ${currentWeather.temperature}${degreeLabel}`;
    }

    largeWeatherIcon.appendChild(currTemperature);
    currentCell2.appendChild(largeWeatherIcon);
    currentRow2.appendChild(currentCell2);
    table.appendChild(currentRow2);

    // Row 3: Feels like temperature
    const currentRow3 = document.createElement("tr");
    const currentCell3 = document.createElement("td");
    currentCell3.colSpan = colspan;
    currentCell3.className = "current";

    if (this.config.showFeelsLike && this.config.onlyTemp === false) {
      const feelsLikeContainer = document.createElement("div");
      feelsLikeContainer.className = "wind-container small dimmed";
      const currFeelsLike = document.createElement("span");
      currFeelsLike.className = "small dimmed";

      if (this.config.tempUnits === "f") {
        currFeelsLike.innerHTML = ` ${(
          currentWeather.feelsLikeTemp * (9 / 5)
          + 32
        ).toFixed(0)}${degreeLabel}`;
      }
      else {
        const feelsLikeString = this.translate("FEELS");
        const feelsLikeText = feelsLikeString.replace("{DEGREE}", `${currentWeather.feelsLikeTemp}${degreeLabel}`);
        currFeelsLike.innerHTML = feelsLikeText;
      }
      feelsLikeContainer.appendChild(currFeelsLike);
      currentCell3.appendChild(feelsLikeContainer);
    }

    currentRow3.appendChild(currentCell3);
    table.appendChild(currentRow3);

    // Row 4: Current weather alerts
    if (this.config.showAlerts && currentWeather.alerts.length > 0) {
      const currentRow4 = document.createElement("tr");
      const currentCell4 = document.createElement("td");
      currentCell4.colSpan = colspan;
      currentCell4.className = "alert";

      const validAlerts = currentWeather.alerts
        .filter(alert => alert?.event)
        .map(alert => alert.event);

      if (validAlerts.length > 0) {
        const fragment = document.createDocumentFragment();
        for (const [index, alertEvent] of validAlerts.entries()) {
          if (index > 0) {
            fragment.appendChild(document.createElement("br"));
          }
          const span = document.createElement("span");
          span.textContent = alertEvent;
          fragment.appendChild(span);
        }
        currentCell4.appendChild(fragment);
        currentRow4.appendChild(currentCell4);
        table.appendChild(currentRow4);
      }
    }

    return table;
  },

  getOrdinal(bearing) {
    return this.config.labelOrdinals[Math.round(bearing * 16 / 360) % 16];
  },

  cardinalWindDirection(windDir) {
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
  },

  // Create a wind badge with centered speed value and compass direction indicator
  createWindBadge(speed, directionDeg) {
    const container = document.createElement("div");
    container.className = "wind-badge";

    const compass = document.createElement("div");
    compass.className = "wind-compass";
    compass.style.transform = `rotate(${directionDeg}deg)`;
    container.appendChild(compass);

    const value = document.createElement("span");
    value.className = "wind-value";
    value.textContent = speed;
    container.appendChild(value);

    return container;
  },

  convertOpenWeatherIdToIcon(id, openweatherIcon) {
    if (id >= 200 && id < 300) {
      // Thunderstorm
      return "thunderstorm";
    }
    if (id >= 300 && id < 400) {
      // Drizzle
      return "rain";
    }
    if (id === 511) {
      // Rain - freezing rain
      return "sleet";
    }
    if (id >= 500 && id < 600) {
      // Rain
      return "rain";
    }
    if (id >= 610 && id < 620) {
      // Snow - sleet or with rain
      return "sleet";
    }
    if (id >= 600 && id < 700) {
      // Snow
      return "snow";
    }
    if (id === 781) {
      // Atmosphere - tornado
      return "tornado";
    }
    if (id >= 700 && id < 800) {
      // Atmosphere
      return "fog";
    }
    if (id >= 800 && id < 810) {
      const isDay = openweatherIcon.slice(-1) === "d";

      if (id === 800) {
        // Clear
        if (isDay) {
          return "clear-day";
        }
        return "clear-night";
      }
      if (id === 801 || id === 802) {
        // Clouds - few or scattered
        if (isDay) {
          return "partly-cloudy-day";
        }
        return "partly-cloudy-night";
      }
      if (id === 803 || id === 804) {
        // Clouds - broken or overcast
        return "cloudy";
      }
    }
    return false;
  },

  roundValue(temperature) {
    const decimals = this.config.roundTemp
      ? 0
      : 1;
    return parseFloat(temperature).toFixed(decimals);
  },

  /*
   * Convert the OpenWeatherMap icons to a more usable name.
   */
  convertWeatherType(weatherType) {
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
  },

  /*
   * ms2Beaufort(ms)
   * Converts m2 to beaufort (windspeed).
   *
   * see:
   *  https://www.spc.noaa.gov/faq/tornado/beaufort.html
   *  https://en.wikipedia.org/wiki/Beaufort_scale#Modern_scale
   *
   * argument ms number - Windspeed in m/s.
   *
   * return number - Windspeed in beaufort.
   */
  mph2Beaufort(mph) {
    const kmh = mph * 1.60934;
    const speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
    for (const beaufort of speeds) {
      const speed = speeds[beaufort];
      if (speed > kmh) {
        return beaufort;
      }
    }
    return 12;
  }
});
