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
  afterRender(state);
}

function afterRender(state) {
  const toggleButton = document.getElementsByClassName("toggle-button")[0];
  const navbarLinks = document.getElementsByClassName("navbar-links")[0];
  const metricOne = document.getElementById("metric1");
  const metricTwo = document.getElementById("metric2");
  const metricThree = document.getElementById("metric3");
  let metricInputNumber = document.getElementById("metric-input-number");
  let metricOutputNumber = document.getElementById("metric-output-number");

  // This code is for the collapsible navbar
  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });
  // This is the data object for the metric dropdowns
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
      Meter: [
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
      Celsius: ["Fahrenheit", "Kelvin"]
    }
  };
  // // This is the data object for the imperial dropdowns
  // const imperialData = {
  //   Length: {
  //     Inch: [
  //       "Millimeter",
  //       "Centimeter",
  //       "Meter",
  //       "Kilometer",
  //       "Foot",
  //       "Yard",
  //       "Mile"
  //     ],
  //     Foot: [
  //       "Millimeter",
  //       "Centimeter",
  //       "Meter",
  //       "Kilometer",
  //       "Inch",
  //       "Yard",
  //       "Mile"
  //     ],
  //     Yard: [
  //       "Millimeter",
  //       "Centimeter",
  //       "Meter",
  //       "Kilometer",
  //       "Inch",
  //       "Foot",
  //       "Mile"
  //     ],
  //     Mile: [
  //       "Millimeter",
  //       "Centimeter",
  //       "meter",
  //       "Kilometer",
  //       "Inch",
  //       "Foot",
  //       "Yard"
  //     ]
  //   },
  //   Weight: {
  //     Ounce: ["Milligram", "Centigram", "Gram", "Kilogram", "Pound", "Ton"],
  //     Pound: ["Milligram", "Centigram", "Gram", "Kilogram", "Ounce", "Ton"],
  //     Ton: ["Milligram", "Centigram", "Gram", "Kilogram", "Ounce", "Pound"]
  //   },
  //   Volume: {},
  //   Area: {
  //     SquareInch: [
  //       "Square Millimeter",
  //       "Square Centimeter",
  //       "Square Meter",
  //       "Square Kilometer",
  //       "Hectare",
  //       "Square Foot",
  //       "Square Mile",
  //       "Acre"
  //     ],
  //     SquareFoot: [
  //       "Square Millimeter",
  //       "Square Centimeter",
  //       "Square Meter",
  //       "Square Kilometer",
  //       "Hectare",
  //       "Square Inch",
  //       "Square Mile",
  //       "Acre"
  //     ],
  //     SquareMile: [
  //       "Square Millimeter",
  //       "Square Centimeter",
  //       "Square Meter",
  //       "Square Kilometer",
  //       "Hectare",
  //       "Square Inch",
  //       "Square Foot",
  //       "Acre"
  //     ],
  //     Acre: [
  //       "Square Millimeter",
  //       "Square Centimeter",
  //       "Square Meter",
  //       "Square Kilometer",
  //       "Hectare",
  //       "Square Inch",
  //       "Square Foot",
  //       "Square Mile"
  //     ]
  //   },
  //   Temperature: {
  //     Fahrenheit: ["Metric", "Kelvin"]
  //   }
  // };
  // This is the function for the cascading metric dropdown lists
  function cascadingMetricData() {
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

    // Adds event listeners to the variables
    metricInputNumber.addEventListener("keyup", metricResultValue);
    metricInputNumber.addEventListener("click", metricResultValue);
    metricOne.addEventListener("change", metricResultValue);
    metricTwo.addEventListener("change", metricResultValue);
    metricThree.addEventListener("change", metricResultValue);

    // Actual Conversion Function
    function metricResultValue() {
      // If..Else If statements for Length Conversions

      // Else If statements for Millimeter Conversions
      if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 10;
      } else if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1000;
      } else if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1000000;
      } else if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 25.4;
      } else if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 304.8;
      } else if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Yard"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 914.4;
      } else if (
        metricTwo.value === "Millimeter" &&
        metricThree.value === "Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609344;
      }

      // Else If statements for Centimeter Conversions
      else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) * 10;
      } else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 100;
      } else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 100000;
      } else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2.54;
      } else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 30.48;
      } else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Yard"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 91.44;
      } else if (
        metricTwo.value === "Centimeter" &&
        metricThree.value === "Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 160934.4;
      }

      // Else If statements for Meter Conversions
      else if (
        metricTwo.value === "Meter" &&
        metricThree.value === "Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) * 1000;
      } else if (
        metricTwo.value === "Meter" &&
        metricThree.value === "Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) * 10;
      } else if (
        metricTwo.value === "Meter" &&
        metricThree.value === "Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1000;
      } else if (metricTwo.value === "Meter" && metricThree.value === "Inch") {
        metricOutputNumber.value = Number(metricInputNumber.value) * 39.3701;
      } else if (metricTwo.value === "Meter" && metricThree.value === "Foot") {
        metricOutputNumber.value = Number(metricInputNumber.value) * 3.28084;
      } else if (metricTwo.value === "Meter" && metricThree.value === "Yard") {
        metricOutputNumber.value = Number(metricInputNumber.value) * 1.09361;
      } else if (metricTwo.value === "Meter" && metricThree.value === "Mile") {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      }

      // Else If statements for Kilometer Conversions
      else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      } else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      } else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      } else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      } else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      } else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Yard"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      } else if (
        metricTwo.value === "Kilometer" &&
        metricThree.value === "Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1609.344;
      }

      // Else If Statements for Weight Conversions

      // Else If Statements for Milligram Conversions
      else if (
        metricTwo.value === "Milligram" &&
        metricThree.value === "Centigram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "Milligram" &&
        metricThree.value === "Gram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "Milligram" &&
        metricThree.value === "Kilogram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "Milligram" &&
        metricThree.value === "Ounce"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "Milligram" &&
        metricThree.value === "Pound"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "Milligram" &&
        metricThree.value === "Ton"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      }

      // Else If Statements for Centigram Conversions
      else if (
        metricTwo.value === "Centigram" &&
        metricThree.value === "Milligram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "Centigram" &&
        metricThree.value === "Gram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "Centigram" &&
        metricThree.value === "Kilogram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "Centigram" &&
        metricThree.value === "Ounce"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "Centigram" &&
        metricThree.value === "Pound"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "Centigram" &&
        metricThree.value === "Ton"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      }

      // Else If Statements for Gram Conversions
      else if (
        metricTwo.value === "Gram" &&
        metricThree.value === "Milligram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "Gram" &&
        metricThree.value === "Centigram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "Gram" &&
        metricThree.value === "Kilogram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (metricTwo.value === "Gram" && metricThree.value === "Ounce") {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (metricTwo.value === "Gram" && metricThree.value === "Pound") {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (metricTwo.value === "Gram" && metricThree.value === "Ton") {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      }

      // Else If Statements for Kilogram Conversions
      else if (
        metricTwo.value === "Kilogram" &&
        metricThree.value === "Milligram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "Kilogram" &&
        metricThree.value === "Centigram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "Kilogram" &&
        metricThree.value === "Gram"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "Kilogram" &&
        metricThree.value === "Ounce"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "Kilogram" &&
        metricThree.value === "Pound"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "Kilogram" &&
        metricThree.value === "Ton"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      }

      // Else If Statements for Area Conversions

      //Else If Statement for SquareMillimeter Conversions
      else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Square Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Square Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Square Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Hectare"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Square Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Square Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Square Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 7;
      } else if (
        metricTwo.value === "SquareMillimeter" &&
        metricThree.value === "Acre"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 8;
      }

      //Else If Statement for SquareCentimeter Conversions
      else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Square Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Square Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Square Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Hectare"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Square Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Square Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Square Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 7;
      } else if (
        metricTwo.value === "SquareCentimeter" &&
        metricThree.value === "Acre"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 8;
      }

      //Else If Statement for SquareMeter Conversions
      else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Square Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Square Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Square Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Hectare"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Square Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Square Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Square Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 7;
      } else if (
        metricTwo.value === "SquareMeter" &&
        metricThree.value === "Acre"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 8;
      }

      //Else If Statement for SquareKilometer Conversions
      else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Square Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Square Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Square Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Hectare"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Square Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Square Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Square Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 7;
      } else if (
        metricTwo.value === "SquareKilometer" &&
        metricThree.value === "Acre"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 8;
      }

      //Else If Statement for Hectare Conversions
      else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Millimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Centimeter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Meter"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 3;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Kilometer"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 4;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Inch"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 5;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Foot"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 6;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Square Mile"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 7;
      } else if (
        metricTwo.value === "Hectare" &&
        metricThree.value === "Acre"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 8;
      }

      // Else If Statements for Temperature Conversions

      //Else If Statement for Celsius Conversions
      else if (
        metricTwo.value === "Celsius" &&
        metricThree.value === "Fahrenheit"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 1;
      } else if (
        metricTwo.value === "Celsius" &&
        metricThree.value === "Kelvin"
      ) {
        metricOutputNumber.value = Number(metricInputNumber.value) / 2;
      }
    }
  }

  if (state.view === "Metricsystem") {
    cascadingMetricData();
  }
  // function cascadingImperialData() {
  //   const imperialOne = document.getElementById("imperial1");
  //   const imperialTwo = document.getElementById("imperial2");
  //   const imperialThree = document.getElementById("imperial3");

  //   for (const imperialMeasurementType in imperialData) {
  //     imperialOne.options[imperialOne.options.length] = new Option(
  //       imperialMeasurementType
  //     );
  //   }

  //   imperialOne.onchange = function() {
  //     imperialTwo.length = 1;
  //     imperialThree.length = 1;
  //     for (const imperialUnitType in imperialData[this.value]) {
  //       imperialTwo.options[imperialTwo.options.length] = new Option(
  //         imperialUnitType
  //       );
  //     }
  //   };
  //   imperialTwo.onchange = function() {
  //     imperialThree.length = 1;

  //     const imperialOutputType = imperialData[imperialOne.value][this.value];
  //     for (let i = 0; i < imperialOutputType.length; i++) {
  //       imperialThree.options[imperialThree.options.length] = new Option(
  //         imperialOutputType[i]
  //       );
  //     }
  //   };
  // }
  // These invocations cause the nav bar links to not work.
  // cascadingMetricData();
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
      case "Metricsystem":
        axios
          .get(
            "https://www.swapi.tech/api/people/" +
              Math.floor(Math.random() * 83)
          )
          .then(response => {
            console.log(response.data);
            store.Metricsystem.swapi = {
              name: response.data.result.properties.name
            };
            done();
          })
          .catch(error => {
            console.log(error);
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
