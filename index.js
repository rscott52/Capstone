import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
  `;

  router.updatePageLinks();
}

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
// This code is for the collapsible navbar
const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
  navbarLinks.classList.toggle("active");
});

// This code is for the Contact Form on the Contact Page
// const form = document.querySelector("form");

// form.addEventListener("submit", event => {
//   event.preventDefault();

//   console.log("The form was submitted!");

//   console.log("event", event);

//   const inputs = event.target.elements;
//   console.log("form's input elements: ", inputs);

//   for (let input of inputs) {
//     console.log(
//       `This input is named ${input.name} and has a value of ${input.value}`
//     );
//   }

//   const requestData = {
//     name: inputs.name.value,
//     email: inputs.email.value,
//     issueType: inputs.issueType.value,
//     msg: inputs.msg.value
//   };

//   console.log(requestData);

//   form.reset();

//   const userInput = document.querySelector("#userInput");
//   for (let input in requestData) {
//     const newList = document.createElement("li");
//     newList.textContent = `${input}: ${requestData[input]}`;
//     userInput.appendChild(newList);
//   }
// });