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
      // case "Home":
      //   axios
      //     // Get request to retrieve the current weather data using the API key and providing a city name
      //     .get(
      //       `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
      //     )
      //     .then(response => {
      //       // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
      //       const kelvinToFahrenheit = kelvinTemp =>
      //         Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

      //       // Create an object to be stored in the Home state from the response
      //       store.Home.weather = {
      //         city: response.data.name,
      //         temp: kelvinToFahrenheit(response.data.main.temp),
      //         feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
      //         description: response.data.weather[0].main
      //       };
      //       done();
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       done();
      //     });
      //   break;
      case "Character":
        axios
          .get(
            "https://www.swapi.tech/api/people/" +
              Math.floor(Math.random() * 83)
          )
          .then(response => {
            console.log(response.data);
            store.Character.swapi = {
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
