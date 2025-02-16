const iconSets = {
  "4a": "DarkSky",
  "4b": "OpenWeatherMap"
};

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

Object.keys(iconSets).forEach((iconSetName) => {
  const iconSet = document.createElement("div");
  iconSet.classList.add("icon-set");

  const iconSetTitle = document.createElement("h2");
  iconSetTitle.innerHTML = `${iconSetName} - ${iconSets[iconSetName]}`;
  document.body.appendChild(iconSetTitle);

  let fileExtension = ".svg";
  if (iconSetName === "4a") {
    fileExtension = ".png";
  }

  Object.keys(weatherTypes).forEach((iconName) => {
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    const icon = document.createElement("img");
    icon.src = `${iconSetName}/${iconName}${fileExtension}`;
    icon.alt = weatherTypes[iconName];
    iconContainer.appendChild(icon);
    const iconTitle = document.createElement("p");
    iconTitle.innerHTML = `${iconName} - ${weatherTypes[iconName]}`;
    iconTitle.style.textAlign = "center";
    iconContainer.appendChild(iconTitle);
    iconSet.appendChild(iconContainer);
  });

  document.body.appendChild(iconSet);
});
