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
  const inputOne = document.getElementById("input1");
  const inputTwo = document.getElementById("input2");
  const output = document.getElementById("output");
  let inputNumber = document.getElementById("input-number");
  let outputNumber = document.getElementById("output-number");

  // This code is for the collapsible navbar
  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });
  // This is the data object for the metric dropdowns
  const conversionData = {
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
        "Meter",
        "Inch",
        "Foot",
        "Yard",
        "Mile"
      ],
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
        "Meter",
        "Kilometer",
        "Inch",
        "Foot",
        "Yard"
      ]
    },
    Weight: {
      Milligram: ["Centigram", "Gram", "Kilogram", "Ounce", "Pound", "Ton"],
      Centigram: ["Milligram", "Gram", "Kilogram", "Ounce", "Pound", "Ton"],
      Gram: ["Milligram", "Centigram", "Kilogram", "Ounce", "Pound", "Ton"],
      Kilogram: ["Milligram", "Centigram", "Gram", "Ounce", "Pound", "Ton"],
      Ounce: ["Milligram", "Centigram", "Gram", "Kilogram", "Pound", "Ton"],
      Pound: ["Milligram", "Centigram", "Gram", "Kilogram", "Ounce", "Ton"],
      Ton: ["Milligram", "Centigram", "Gram", "Kilogram", "Ounce", "Pound"]
    },
    Volume: {
      "US Teaspoon": [
        "US Tablespoon",
        "US Fluid Ounce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "US Tablespoon": [
        "US Teaspoon",
        "US Fluid Ounce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "US Fluid Ounce": [
        "US Teaspoon",
        "US Tablespoon",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "US Pint": [
        "US Teaspoon",
        "US Tablespoon",
        "US Fluid Ounce",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "US Quart": [
        "US Teaspoon",
        "US Tablespoon",
        "US Fluid Ounce",
        "US Pint",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "US Gallon": [
        "US Teaspoon",
        "US Tablespoon",
        "US Fluid Ounce",
        "US Pint",
        "US Quart",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "Imperial Teaspoon": [
        "US Teaspoon",
        "US Tablespoon",
        "US Fluid Ounce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "Imperial Tablespoon": [
        "US Teaspoon",
        "US Tablespoon",
        "US Fluid Ounce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "Imperial Fluid Ounce": [
        "US Teaspoon",
        "US Tablespoon",
        "US Fluid Ounce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "Imperial Pint": [
        "US Teaspoon",
        "US Tablespoon",
        "US FluidOunce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "Imperial Quart": [
        "US Teaspoon",
        "US Tablespoon",
        "US FluidOunce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Gallon",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      "Imperial Gallon": [
        "US Teaspoon",
        "US Tablespoon",
        "US FluidOunce",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Milliliter",
        "Liter",
        "Kiloliter"
      ],
      Milliliter: [
        "US Teaspoon",
        "US Tablespoon",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Liter",
        "Kiloliter"
      ],
      Liter: [
        "US Teaspoon",
        "US Tablespoon",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Kiloliter"
      ],
      Kiloliter: [
        "US Teaspoon",
        "US Tablespoon",
        "US Pint",
        "US Quart",
        "US Gallon",
        "Imperial Teaspoon",
        "Imperial Tablespoon",
        "Imperial Fluid Ounce",
        "Imperial Pint",
        "Imperial Quart",
        "Imperial Gallon",
        "Milliliter",
        "Liter"
      ]
    },
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
      ],
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
      Celsius: ["Fahrenheit", "Kelvin"],
      Fahrenheit: ["Celsius", "Kelvin"],
      Kelvin: ["Celsius", "Fahrenheit"]
    }
  };
  // This is the function for the cascading metric dropdown lists
  function cascadingConversionData() {
    for (const converisonMeasurementType in conversionData) {
      inputOne.options[inputOne.options.length] = new Option(
        converisonMeasurementType
      );
    }

    inputOne.onchange = function() {
      inputTwo.length = 1;
      output.length = 1;
      for (const conversionUnitType in conversionData[this.value]) {
        inputTwo.options[inputTwo.options.length] = new Option(
          conversionUnitType
        );
      }
    };
    inputTwo.onchange = function() {
      output.length = 1;

      const conversionOutputType = conversionData[inputOne.value][this.value];

      for (let i = 0; i < conversionOutputType.length; i++) {
        output.options[output.options.length] = new Option(
          conversionOutputType[i]
        );
      }
    };

    // Adds event listeners to the variables
    inputNumber.addEventListener("keyup", conversionResultValue);
    inputNumber.addEventListener("click", conversionResultValue);
    inputOne.addEventListener("change", conversionResultValue);
    inputTwo.addEventListener("change", conversionResultValue);
    output.addEventListener("change", conversionResultValue);

    // Actual Conversion Function
    function conversionResultValue() {
      // If..Else If statements for Length Conversions

      // Else If statements for Millimeter Conversions
      if (inputTwo.value === "Millimeter" && output.value === "Centimeter") {
        outputNumber.value = Number(inputNumber.value) / 10;
      } else if (inputTwo.value === "Millimeter" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) / 1000;
      } else if (
        inputTwo.value === "Millimeter" &&
        output.value === "Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1000000;
      } else if (inputTwo.value === "Millimeter" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) / 25.4;
      } else if (inputTwo.value === "Millimeter" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) / 304.8;
      } else if (inputTwo.value === "Millimeter" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) / 914.4;
      } else if (inputTwo.value === "Millimeter" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 1609344;
      }

      // Else If statements for Centimeter Conversions
      else if (
        inputTwo.value === "Centimeter" &&
        output.value === "Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10;
      } else if (inputTwo.value === "Centimeter" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) / 100;
      } else if (
        inputTwo.value === "Centimeter" &&
        output.value === "Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 100000;
      } else if (inputTwo.value === "Centimeter" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) / 2.54;
      } else if (inputTwo.value === "Centimeter" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) / 30.48;
      } else if (inputTwo.value === "Centimeter" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) / 91.44;
      } else if (inputTwo.value === "Centimeter" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 160934.4;
      }

      // Else If statements for Meter Conversions
      else if (inputTwo.value === "Meter" && output.value === "Millimeter") {
        outputNumber.value = Number(inputNumber.value) * 1000;
      } else if (inputTwo.value === "Meter" && output.value === "Centimeter") {
        outputNumber.value = Number(inputNumber.value) * 100;
      } else if (inputTwo.value === "Meter" && output.value === "Kilometer") {
        outputNumber.value = Number(inputNumber.value) / 1000;
      } else if (inputTwo.value === "Meter" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) * 39.37;
      } else if (inputTwo.value === "Meter" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) * 3.28;
      } else if (inputTwo.value === "Meter" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) * 1.09;
      } else if (inputTwo.value === "Meter" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 1609.34;
      }

      // Else If statements for Kilometer Conversions
      else if (
        inputTwo.value === "Kilometer" &&
        output.value === "Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1000000;
      } else if (
        inputTwo.value === "Kilometer" &&
        output.value === "Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 100000;
      } else if (inputTwo.value === "Kilometer" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) * 1000;
      } else if (inputTwo.value === "Kilometer" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) * 39370.08;
      } else if (inputTwo.value === "Kilometer" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) * 3280.84;
      } else if (inputTwo.value === "Kilometer" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) * 1093.61;
      } else if (inputTwo.value === "Kilometer" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 1.609;
      }

      // Else If statements for Inch Conversions
      else if (
        inputTwo.value === "Inch" &&
        outputNumber.value === "Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 25.4;
      } else if (inputTwo.value === "Inch" && output.value === "Centimeter") {
        outputNumber.value = Number(inputNumber.value) * 2.54;
      } else if (inputTwo.value === "Inch" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) / 39.37;
      } else if (inputTwo.value === "Inch" && output.value === "Kilometer") {
        outputNumber.value = Number(inputNumber.value) / 39370.08;
      } else if (inputTwo.value === "Inch" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) / 12;
      } else if (inputTwo.value === "Inch" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) / 36;
      } else if (inputTwo.value === "Inch" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 63360;
      }

      // Else If statements for Foot Conversions
      else if (inputTwo.value === "Foot" && output.value === "Millimeter") {
        outputNumber.value = Number(inputNumber.value) * 304.8;
      } else if (inputTwo.value === "Foot" && output.value === "Centimeter") {
        outputNumber.value = Number(inputNumber.value) * 30.48;
      } else if (inputTwo.value === "Foot" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) / 3.281;
      } else if (inputTwo.value === "Foot" && output.value === "Kilometer") {
        outputNumber.value = Number(inputNumber.value) / 3280.84;
      } else if (inputTwo.value === "Foot" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) * 12;
      } else if (inputTwo.value === "Foot" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) / 3;
      } else if (inputTwo.value === "Foot" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 5280;
      }

      // Else If statements for Yard Conversions
      else if (inputTwo.value === "Yard" && output.value === "Millimeter") {
        outputNumber.value = Number(inputNumber.value) * 914.4;
      } else if (inputTwo.value === "Yard" && output.value === "Centimeter") {
        outputNumber.value = Number(inputNumber.value) * 91.44;
      } else if (inputTwo.value === "Yard" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) * 0.9144;
      } else if (inputTwo.value === "Yard" && output.value === "Kilometer") {
        outputNumber.value = Number(inputNumber.value) * 0.000914;
      } else if (inputTwo.value === "Yard" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) * 36;
      } else if (inputTwo.value === "Yard" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) * 3;
      } else if (inputTwo.value === "Yard" && output.value === "Mile") {
        outputNumber.value = Number(inputNumber.value) / 1760;
      }

      // Else If statements for Mile Conversions
      else if (inputTwo.value === "Mile" && output.value === "Millimeter") {
        outputNumber.value = Number(inputNumber.value) * 1609344;
      } else if (inputTwo.value === "Mile" && output.value === "Centimeter") {
        outputNumber.value = Number(inputNumber.value) * 160934.4;
      } else if (inputTwo.value === "Mile" && output.value === "Meter") {
        outputNumber.value = Number(inputNumber.value) * 1609.34;
      } else if (inputTwo.value === "Mile" && output.value === "Kilometer") {
        outputNumber.value = Number(inputNumber.value) * 1.60934;
      } else if (inputTwo.value === "Mile" && output.value === "Inch") {
        outputNumber.value = Number(inputNumber.value) * 63360;
      } else if (inputTwo.value === "Mile" && output.value === "Foot") {
        outputNumber.value = Number(inputNumber.value) * 5280;
      } else if (inputTwo.value === "Mile" && output.value === "Yard") {
        outputNumber.value = Number(inputNumber.value) * 1760;
      }

      // Else If Statements for Weight Conversions

      // Else If Statements for Milligram Conversions
      else if (inputTwo.value === "Milligram" && output.value === "Centigram") {
        outputNumber.value = Number(inputNumber.value) / 10;
      } else if (inputTwo.value === "Milligram" && output.value === "Gram") {
        outputNumber.value = Number(inputNumber.value) / 1000;
      } else if (
        inputTwo.value === "Milligram" &&
        output.value === "Kilogram"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1000000;
      } else if (inputTwo.value === "Milligram" && output.value === "Ounce") {
        outputNumber.value = Number(inputNumber.value) / 28349.5231;
      } else if (inputTwo.value === "Milligram" && output.value === "Pound") {
        outputNumber.value = Number(inputNumber.value) / 453592.37;
      } else if (inputTwo.value === "Milligram" && output.value === "Ton") {
        outputNumber.value = Number(inputNumber.value) / 907184740;
      }

      // Else If Statements for Centigram Conversions
      else if (inputTwo.value === "Centigram" && output.value === "Milligram") {
        outputNumber.value = Number(inputNumber.value) * 10;
      } else if (inputTwo.value === "Centigram" && output.value === "Gram") {
        outputNumber.value = Number(inputNumber.value) / 100;
      } else if (
        inputTwo.value === "Centigram" &&
        output.value === "Kilogram"
      ) {
        outputNumber.value = Number(inputNumber.value) / 100000;
      } else if (inputTwo.value === "Centigram" && output.value === "Ounce") {
        outputNumber.value = Number(inputNumber.value) / 2834.95231;
      } else if (inputTwo.value === "Centigram" && output.value === "Pound") {
        outputNumber.value = Number(inputNumber.value) / 45359.237;
      } else if (inputTwo.value === "Centigram" && output.value === "Ton") {
        outputNumber.value = Number(inputNumber.value) / 90718474;
      }

      // Else If Statements for Gram Conversions
      else if (inputTwo.value === "Gram" && output.value === "Milligram") {
        outputNumber.value = Number(inputNumber.value) * 1000;
      } else if (inputTwo.value === "Gram" && output.value === "Centigram") {
        outputNumber.value = Number(inputNumber.value) * 100;
      } else if (inputTwo.value === "Gram" && output.value === "Kilogram") {
        outputNumber.value = Number(inputNumber.value) / 1000;
      } else if (inputTwo.value === "Gram" && output.value === "Ounce") {
        outputNumber.value = Number(inputNumber.value) / 28.34952;
      } else if (inputTwo.value === "Gram" && output.value === "Pound") {
        outputNumber.value = Number(inputNumber.value) / 453.592;
      } else if (inputTwo.value === "Gram" && output.value === "Ton") {
        outputNumber.value = Number(inputNumber.value) / 907184.74;
      }

      // Else If Statements for Kilogram Conversions
      else if (inputTwo.value === "Kilogram" && output.value === "Milligram") {
        outputNumber.value = Number(inputNumber.value) * 1000000;
      } else if (
        inputTwo.value === "Kilogram" &&
        output.value === "Centigram"
      ) {
        outputNumber.value = Number(inputNumber.value) * 100000;
      } else if (inputTwo.value === "Kilogram" && output.value === "Gram") {
        outputNumber.value = Number(inputNumber.value) * 1000;
      } else if (inputTwo.value === "Kilogram" && output.value === "Ounce") {
        outputNumber.value = Number(inputNumber.value) * 35.27396195;
      } else if (inputTwo.value === "Kilogram" && output.value === "Pound") {
        outputNumber.value = Number(inputNumber.value) * 2.2046226218;
      } else if (inputTwo.value === "Kilogram" && output.value === "Ton") {
        outputNumber.value = Number(inputNumber.value) / 907.18474;
      }

      // Else If Statements for Ounce Conversions
      else if (inputTwo.value === "Ounce" && output.value === "Milligram") {
        outputNumber.value = Number(inputNumber.value) * 28349.5231;
      } else if (inputTwo.value === "Ounce" && output.value === "Centigram") {
        outputNumber.value = Number(inputNumber.value) * 2834.95231;
      } else if (inputTwo.value === "Ounce" && output.value === "Gram") {
        outputNumber.value = Number(inputNumber.value) * 28.34952;
      } else if (inputTwo.value === "Ounce" && output.value === "Kilogram") {
        outputNumber.value = Number(inputNumber.value) / 35.27396195;
      } else if (inputTwo.value === "Ounce" && output.value === "Pound") {
        outputNumber.value = Number(inputNumber.value) / 16;
      } else if (inputTwo.value === "Ounce" && output.value === "Ton") {
        outputNumber.value = Number(inputNumber.value) / 32000;
      }

      // Else If Statements for Pound Conversions
      else if (inputTwo.value === "Pound" && output.value === "Milligram") {
        outputNumber.value = Number(inputNumber.value) * 453592.37;
      } else if (inputTwo.value === "Pound" && output.value === "Centigram") {
        outputNumber.value = Number(inputNumber.value) * 45359.237;
      } else if (inputTwo.value === "Pound" && output.value === "Gram") {
        outputNumber.value = Number(inputNumber.value) * 453.592;
      } else if (inputTwo.value === "Pound" && output.value === "Kilogram") {
        outputNumber.value = Number(inputNumber.value) / 2.2046226218;
      } else if (inputTwo.value === "Pound" && output.value === "Ounce") {
        outputNumber.value = Number(inputNumber.value) * 16;
      } else if (inputTwo.value === "Pound" && output.value === "Ton") {
        outputNumber.value = Number(inputNumber.value) / 2000;
      }

      // Else If Statements for Ton Conversions
      else if (inputTwo.value === "Ton" && output.value === "Milligram") {
        outputNumber.value = Number(inputNumber.value) * 907184740;
      } else if (inputTwo.value === "Ton" && output.value === "Centigram") {
        outputNumber.value = Number(inputNumber.value) * 90718474;
      } else if (inputTwo.value === "Ton" && output.value === "Gram") {
        outputNumber.value = Number(inputNumber.value) * 907184.74;
      } else if (inputTwo.value === "Ton" && output.value === "Kilogram") {
        outputNumber.value = Number(inputNumber.value) * 907.18474;
      } else if (inputTwo.value === "Ton" && output.value === "Ounce") {
        outputNumber.value = Number(inputNumber.value) * 32000;
      } else if (inputTwo.value === "Ton" && output.value === "Pound") {
        outputNumber.value = Number(inputNumber.value) * 2000;
      }

      // Else If Statements for Volume Conversions

      // Else If Statements for US Teaspoon Conversions
      else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "US Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 3;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "US Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) / 6;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "US Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 96;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "US Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 192;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "US Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 768;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Imperial Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1.201;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Imperial Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 3.603;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Imperial Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) / 5.765;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Imperial Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 115.3;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Imperial Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 230.6;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Imperial Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 992.3;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Milliliter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 4.928922;
      } else if (inputTwo.value === "US Teaspoon" && output.value === "Liter") {
        outputNumber.value = Number(inputNumber.value) / 202.884136;
      } else if (
        inputTwo.value === "US Teaspoon" &&
        output.value === "Kiloliter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 202900;
      }

      // Else If Statements for US Tablespoon Conversions
      else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "US Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 3;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "US Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) / 2;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "US Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 32;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "US Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 64;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "US Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 256;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Imperial Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 2.498;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Imperial Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1.201;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Imperial Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1.922;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Imperial Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 38.43;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Imperial Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 76.861;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Imperial Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 307.4;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Milliliter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 14.787;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Liter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 67.628;
      } else if (
        inputTwo.value === "US Tablespoon" &&
        output.value === "Kiloliter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 67630;
      }

      // Else If Statements for US Fluid Ounce Conversions
      else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "US Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 6;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "US Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 2;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "US Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 16;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "US Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 32;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "US Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 128;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Imperial Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 4.996;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Imperial Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1.66535;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Imperial Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1.04084;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Imperial Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 19.215;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Imperial Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 38.43;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Imperial Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 153.7;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Milliliter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 29.574;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Liter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 33.814;
      } else if (
        inputTwo.value === "US Fluid Ounce" &&
        output.value === "Kiloliter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 33810;
      }

      // Else If Statements for US Pint Conversions
      else if (inputTwo.value === "US Pint" && output.value === "US Teaspoon") {
        outputNumber.value = Number(inputNumber.value) * 96;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "US Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 32;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "US Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) * 16;
      } else if (inputTwo.value === "US Pint" && output.value === "US Quart") {
        outputNumber.value = Number(inputNumber.value) / 2;
      } else if (inputTwo.value === "US Pint" && output.value === "US Gallon") {
        outputNumber.value = Number(inputNumber.value) / 8;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Imperial Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 79.9367;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Imperial Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 26.6456;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Imperial Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) * 16.6535;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Imperial Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1.201;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Imperial Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 2.402;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Imperial Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 9.608;
      } else if (
        inputTwo.value === "US Pint" &&
        output.value === "Milliliter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 473.176;
      } else if (inputTwo.value === "US Pint" && output.value === "Liter") {
        outputNumber.value = Number(inputNumber.value) / 2.113;
      } else if (inputTwo.value === "US Pint" && output.value === "Kiloliter") {
        outputNumber.value = Number(inputNumber.value) / 2113;
      }

      // Else If Statements for US Quart Conversions
      else if (
        inputTwo.value === "US Quart" &&
        output.value === "US Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 192;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "US Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 64;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "US Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) * 32;
      } else if (inputTwo.value === "US Quart" && output.value === "US Pint") {
        outputNumber.value = Number(inputNumber.value) * 2;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "US Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 4;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Imperial Teaspoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 159.873;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Imperial Tablespoon"
      ) {
        outputNumber.value = Number(inputNumber.value) * 53.2911;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Imperial Fluid Ounce"
      ) {
        outputNumber.value = Number(inputNumber.value) * 33.307;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Imperial Pint"
      ) {
        outputNumber.value = Number(inputNumber.value) * 16;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Imperial Quart"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1.201;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Imperial Gallon"
      ) {
        outputNumber.value = Number(inputNumber.value) / 4.804;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Milliliter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 946.353;
      } else if (inputTwo.value === "US Quart" && output.value === "Liter") {
        outputNumber.value = Number(inputNumber.value) / 1.057;
      } else if (
        inputTwo.value === "US Quart" &&
        output.value === "Kiloliter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1057;
      }

      // Else If Statements for US Gallon Conversions
      // else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (inputTwo.value === "US Gallon" && output.value === "US Gill") {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (inputTwo.value === "US Gallon" && output.value === "US Pint") {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (inputTwo.value === "US Gallon" && output.value === "Liter") {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "US Gallon" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Teaspoon Conversions
      // else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Teaspoon" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Tablespoon Conversions
      // else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Tablespoon" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Fluid Ounce Conversions
      // else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Fluid Ounce" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Gill Conversions
      // else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Gill" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Pint Conversions
      // else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Pint" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Quart Conversions
      // else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Quart" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Imperial Gallon Conversions
      // else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Liter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Imperial Gallon" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Milliliter Conversions
      // else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (inputTwo.value === "Milliliter" && output.value === "Liter") {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (
      //   inputTwo.value === "Milliliter" &&
      //   output.value === "Kiloliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Liter Conversions
      // else if (inputTwo.value === "Liter" && output.value === "US Teaspoon") {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (inputTwo.value === "Liter" && output.value === "US Gill") {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (inputTwo.value === "Liter" && output.value === "US Pint") {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (inputTwo.value === "Liter" && output.value === "US Quart") {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (inputTwo.value === "Liter" && output.value === "US Gallon") {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Liter" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (inputTwo.value === "Liter" && output.value === "Milliliter") {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (inputTwo.value === "Liter" && output.value === "Kiloliter") {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }

      // Else If Statements for Kiloliter Conversions
      // else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "US Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "US Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "US Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (inputTwo.value === "Kiloliter" && output.value === "US Gill") {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (inputTwo.value === "Kiloliter" && output.value === "US Pint") {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "US Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "US Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Teaspoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Tablespoon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Fluid Ounce"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 4;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Gill"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 16;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Pint"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Quart"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 907.18474;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Imperial Gallon"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 32000;
      // } else if (
      //   inputTwo.value === "Kiloliter" &&
      //   output.value === "Milliliter"
      // ) {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // } else if (inputTwo.value === "Kiloliter" && output.value === "Liter") {
      //   outputNumber.value = Number(inputNumber.value) * 2000;
      // }
      // Else If Statements for Area Conversions

      //Else If Statement for SquareMillimeter Conversions
      else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 100;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1000000;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1000000000000;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) / 10000000000;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) / 645.16;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) / 92903.04;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 2589988110000;
      } else if (
        inputTwo.value === "SquareMillimeter" &&
        output.value === "Acre"
      ) {
        outputNumber.value = Number(inputNumber.value) / 4046856422.4;
      }

      //Else If Statement for SquareCentimeter Conversions
      else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 100;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 10000;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 10000000000;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) / 100000000;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) / 6.4516;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) / 929.0304;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 25899881100;
      } else if (
        inputTwo.value === "SquareCentimeter" &&
        output.value === "Acre"
      ) {
        outputNumber.value = Number(inputNumber.value) / 40460564.224;
      }

      //Else If Statement for SquareMeter Conversions
      else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1000000;
      } else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10000;
      } else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1000000;
      } else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) / 10000;
      } else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1550.0031;
      } else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10.76391;
      } else if (
        inputTwo.value === "SquareMeter" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 2589988.11;
      } else if (inputTwo.value === "SquareMeter" && output.value === "Acre") {
        outputNumber.value = Number(inputNumber.value) / 4046.856422;
      }

      //Else If Statement for SquareKilometer Conversions
      else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1000000000000;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10000000000;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1000000;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) * 100;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) * 1550003100.0062;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10763910.41671;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 2.589988;
      } else if (
        inputTwo.value === "SquareKilometer" &&
        output.value === "Acre"
      ) {
        outputNumber.value = Number(inputNumber.value) * 247.105381;
      }

      //Else If Statement for Hectare Conversions
      else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10000000000;
      } else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 100000000;
      } else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 10000;
      } else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 100;
      } else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) * 15500031.000062;
      } else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) * 107639.104167;
      } else if (
        inputTwo.value === "Hectare" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 258.998811;
      } else if (inputTwo.value === "Hectare" && output.value === "Acre") {
        outputNumber.value = Number(inputNumber.value) * 2.471;
      }

      //Else If Statement for SquareInch Conversions
      else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 645.16;
      } else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 6.4516;
      } else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1550.0031;
      } else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 1550003100.0062;
      } else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) / 15500031.000062;
      } else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) / 144;
      } else if (
        inputTwo.value === "SquareInch" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 4014489599.4792;
      } else if (inputTwo.value === "SquareInch" && output.value === "Acre") {
        outputNumber.value = Number(inputNumber.value) / 6272640;
      }

      //Else If Statement for SquareFoot Conversions
      else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 92903.04;
      } else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 929.0304;
      } else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) / 10.76391;
      } else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 10763910.41670972;
      } else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) / 107639.104167;
      } else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) * 144;
      } else if (
        inputTwo.value === "SquareFoot" &&
        output.value === "Square Mile"
      ) {
        outputNumber.value = Number(inputNumber.value) / 27878399.996383;
      } else if (inputTwo.value === "SquareFoot" && output.value === "Acre") {
        outputNumber.value = Number(inputNumber.value) / 43560;
      }

      //Else If Statement for SquareMile Conversions
      else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 2589988110000;
      } else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 25899881100;
      } else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Square Meter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 2589988.11;
      } else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) * 2.589988;
      } else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Hectare"
      ) {
        outputNumber.value = Number(inputNumber.value) * 258.998811;
      } else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Square Inch"
      ) {
        outputNumber.value = Number(inputNumber.value) * 4014489599.4792;
      } else if (
        inputTwo.value === "SquareMile" &&
        output.value === "Square Foot"
      ) {
        outputNumber.value = Number(inputNumber.value) * 27878399.996383;
      } else if (inputTwo.value === "SquareMile" && output.value === "Acre") {
        outputNumber.value = Number(inputNumber.value) * 640;
      }

      //Else If Statement for Acre Conversions
      else if (
        inputTwo.value === "Acre" &&
        output.value === "Square Millimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 4046856422.4;
      } else if (
        inputTwo.value === "Acre" &&
        output.value === "Square Centimeter"
      ) {
        outputNumber.value = Number(inputNumber.value) * 40468564.224;
      } else if (inputTwo.value === "Acre" && output.value === "Square Meter") {
        outputNumber.value = Number(inputNumber.value) * 4046.856422;
      } else if (
        inputTwo.value === "Acre" &&
        output.value === "Square Kilometer"
      ) {
        outputNumber.value = Number(inputNumber.value) / 247.105381;
      } else if (inputTwo.value === "Acre" && output.value === "Hectare") {
        outputNumber.value = Number(inputNumber.value) * 2.47105;
      } else if (inputTwo.value === "Acre" && output.value === "Square Inch") {
        outputNumber.value = Number(inputNumber.value) * 6272640;
      } else if (inputTwo.value === "Acre" && output.value === "Square Foot") {
        outputNumber.value = Number(inputNumber.value) * 43560;
      } else if (inputTwo.value === "Acre" && output.value === "Square Mile") {
        outputNumber.value = Number(inputNumber.value) / 640;
      }

      // Else If Statements for Temperature Conversions

      //Else If Statement for Celsius Conversions
      else if (inputTwo.value === "Celsius" && output.value === "Fahrenheit") {
        outputNumber.value = Number(inputNumber.value * (9 / 5) + 32);
      } else if (inputTwo.value === "Celsius" && output.value === "Kelvin") {
        outputNumber.value = Number(inputNumber.value) + 273.15;
      }

      //Else If Statement for Fahrenheit Conversions
      else if (inputTwo.value === "Fahrenheit" && output.value === "Celsius") {
        outputNumber.value = (Number(inputNumber.value - 32) * 5) / 9;
      } else if (inputTwo.value === "Fahrenheit" && output.value === "Kelvin") {
        outputNumber.value = (Number(inputNumber.value - 32) * 5) / 9 + 273.15;
      }

      //Else If Statement for Kelvin Conversions
      else if (inputTwo.value === "Kelvin" && output.value === "Fahrenheit") {
        outputNumber.value = (Number(inputNumber.value - 273.15) * 9) / 5 + 32;
      } else if (inputTwo.value === "Kelvin" && output.value === "Celsius") {
        outputNumber.value = Number(inputNumber.value) - 273.15;
      }
    }
  }

  if (state.view === "Conversion") {
    cascadingConversionData();
  }

  if (state.view === "Character") {
    // Add an event handler for the submit button on the form
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      // Get the form element
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      // Create a request body object to send to the API
      const requestData = {
        character: inputList.characterName.value
      };
      // Log the request body to the console
      console.log("request Body", requestData);

      axios
        // Make a POST request to the API to create a new character
        .post(`${process.env.Character_API_URL}/characters`, requestData)
        .then(response => {
          //  Then push the new character onto the Character state characters attribute, so it can be displayed in the character list
          store.Character.characters.push(response.data);
          router.navigate("/Character");
        })
        // If there is an error log it to the console
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }
}

router.hooks({
  before: async (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Character":
        await axios
          .get(
            "https://www.swapi.tech/api/people/" +
              Math.floor(Math.random() * 83)
          )
          .then(response => {
            console.log(response.data);
            store.Character.swapi = {
              name: response.data.result.properties.name
            };
          })
          .catch(error => {
            console.log(error);
          });
        await axios
          .get(`${process.env.Character_API_URL}/characters`)
          .then(response => {
            console.log("response", response.data);
            store.Character.characters = response.data;
          })
          .catch(error => {
            console.log("It puked", error);
          });
        done();
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
