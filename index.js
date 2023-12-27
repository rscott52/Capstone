import { Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Nav(store.Links, state)}
    ${Main(state)}
    ${Footer()}
  `;

  router.updatePageLinks();
  afterRender();
}

function afterRender() {
  // This code is for the collapsible navbar
  const toggleButton = document.getElementsByClassName("toggle-button")[0];
  const navbarLinks = document.getElementsByClassName("navbar-links")[0];

  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });

  const metricData = {
    Length: {
      Millimeter: [
        "Centimeter",
        "Meter",
        "Kilometer",
        "Inch",
        "Foot",
        "Yard",
        "Mile"
      ],
      Centimeter: [
        "Millimeter",
        "Meter",
        "Kilometer",
        "Inch",
        "Foot",
        "Yard",
        "Mile"
      ],
      meter: [
        "Millimeter",
        "Centimeter",
        "Kilometer",
        "Inch",
        "Foot",
        "Yard",
        "Mile"
      ],
      Kilometer: [
        "Millimeter",
        "Centimeter",
        "meter",
        "Inch",
        "Foot",
        "Yard",
        "Mile"
      ]
    },
    Weight: {
      Milligram: ["Centigram", "Gram", "Kilogram", "Ounce", "Pound", "Ton"],
      Centigram: ["Milligram", "Gram", "Kilogram", "Ounce", "Pound", "Ton"],
      Gram: ["Milligram", "Centigram", "Kilogram", "Ounce", "Pound", "Ton"],
      Kilogram: ["Milligram", "Centigram", "Gram", "Ounce", "Pound", "Ton"]
    },
    Volume: {},
    Area: {
      SquareMillimeter: [
        "Square Centimeter",
        "Square Meter",
        "Square Kilometer",
        "Hectare",
        "Square Inch",
        "Square Foot",
        "Square Mile",
        "Acre"
      ],
      SquareCentimeter: [
        "Square Millimeter",
        "Square Meter",
        "Square Kilometer",
        "Hectare",
        "Square Inch",
        "Square Foot",
        "Square Mile",
        "Acre"
      ],
      SquareMeter: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Kilometer",
        "Hectare",
        "Square Inch",
        "Square Foot",
        "Square Mile",
        "Acre"
      ],
      SquareKilometer: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Meter",
        "Hectare",
        "Square Inch",
        "Square Foot",
        "Square Mile",
        "Acre"
      ],
      Hectare: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Meter",
        "Square Kilometer",
        "Square Inch",
        "Square Foot",
        "Square Mile",
        "Acre"
      ]
    },
    Temperature: {
      Metric: ["fahrenheit", "Kelvin"]
    }
  };

  const imperialData = {
    Length: {
      Inch: [
        "Millimeter",
        "Centimeter",
        "Meter",
        "Kilometer",
        "Foot",
        "Yard",
        "Mile"
      ],
      Foot: [
        "Millimeter",
        "Centimeter",
        "Meter",
        "Kilometer",
        "Inch",
        "Yard",
        "Mile"
      ],
      Yard: [
        "Millimeter",
        "Centimeter",
        "Meter",
        "Kilometer",
        "Inch",
        "Foot",
        "Mile"
      ],
      Mile: [
        "Millimeter",
        "Centimeter",
        "meter",
        "Kilometer",
        "Inch",
        "Foot",
        "Yard"
      ]
    },
    Weight: {
      Ounce: ["Milligram", "Centigram", "Gram", "Kilogram", "Pound", "Ton"],
      Pound: ["Milligram", "Centigram", "Gram", "Kilogram", "Ounce", "Ton"],
      Ton: ["Milligram", "Centigram", "Gram", "Kilogram", "Ounce", "Pound"]
    },
    Volume: {},
    Area: {
      SquareInch: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Meter",
        "Square Kilometer",
        "Hectare",
        "Square Foot",
        "Square Mile",
        "Acre"
      ],
      SquareFoot: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Meter",
        "Square Kilometer",
        "Hectare",
        "Square Inch",
        "Square Mile",
        "Acre"
      ],
      SquareMile: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Meter",
        "Square Kilometer",
        "Hectare",
        "Square Inch",
        "Square Foot",
        "Acre"
      ],
      Acre: [
        "Square Millimeter",
        "Square Centimeter",
        "Square Meter",
        "Square Kilometer",
        "Hectare",
        "Square Inch",
        "Square Foot",
        "Square Mile"
      ]
    },
    Temperature: {
      Fahrenheit: ["Metric", "Kelvin"]
    }
  };

  function cascadingMetricData() {
    const metricOne = document.getElementById("metric1");
    const metricTwo = document.getElementById("metric2");
    const metricThree = document.getElementById("metric3");
    const metricInputNumber = document.getElementById("metric-input-number");
    const metricOutputNumber = document.getElementById("metric-output-type");

    for (const metricMeasurementType in metricData) {
      metricOne.options[metricOne.options.length] = new Option(
        metricMeasurementType
      );
    }

    metricOne.onchange = function() {
      metricTwo.length = 1;
      metricThree.length = 1;
      for (const metricUnitType in metricData[this.value]) {
        metricTwo.options[metricTwo.options.length] = new Option(
          metricUnitType
        );
      }
    };
    metricTwo.onchange = function() {
      metricThree.length = 1;

      const metricOutputType = metricData[metricOne.value][this.value];

      for (let i = 0; i < metricOutputType.length; i++) {
        metricThree.options[metricThree.options.length] = new Option(
          metricOutputType[i]
        );
      }
    };

    if (metricInputNumber === "kilometer" && metricOutputNumber === "meter") {
      metricOutputNumber = metricInputNumber * 1000;
    }
  }
  function cascadingImperialData() {
    const imperialOne = document.getElementById("imperial1");
    const imperialTwo = document.getElementById("imperial2");
    const imperialThree = document.getElementById("imperial3");

    for (const imperialMeasurementType in imperialData) {
      imperialOne.options[imperialOne.options.length] = new Option(
        imperialMeasurementType
      );
    }

    imperialOne.onchange = function() {
      imperialTwo.length = 1;
      imperialThree.length = 1;
      for (const imperialUnitType in imperialData[this.value]) {
        imperialTwo.options[imperialTwo.options.length] = new Option(
          imperialUnitType
        );
      }
    };
    imperialTwo.onchange = function() {
      imperialThree.length = 1;

      const imperialOutputType = imperialData[imperialOne.value][this.value];

      for (let i = 0; i < imperialOutputType.length; i++) {
        imperialThree.options[imperialThree.options.length] = new Option(
          imperialOutputType[i]
        );
      }
    };
  }
  // These invocations cause the nav bar links to not work.
  // cascadingMetricData();
  // cascadingImperialData();
}

router.hooks({
  before: (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
      case "Home":
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();
