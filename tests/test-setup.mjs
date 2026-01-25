// Mock MagicMirror globals
globalThis.config = { units: "metric" };

// Mock the Module.register to extract methods
let weatherModule = null;

globalThis.Module = {
  register(name, definition) {
    weatherModule = definition;
    // Set config defaults for methods that need them
    weatherModule.config = {
      roundTemp: false,
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
      ]
    };
  }
};

// Load the module
await import("../MMM-OneCallWeather.js");

export { weatherModule };
