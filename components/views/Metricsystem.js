import html from "html-literal";
import metricSystem from "../../MetricSystem/MSButterscotch.png";
import arrow from "../../ImperialSystem/arrowButterscotch.png";
export default state => html`
  <main>
    <div id="calculator-section">
      <div class="metric-calculator">
        <label for="metric1">Measurement Type:</label>
        <select name="Measurement Type" id="metric1">
          <option value="metric-length">Select Input</option>
          <!-- <option value="metric-weight">Weight</option>
          <option value="metric-volume">Volume</option>
          <option value="metric-area">Area</option>
          <option value="metric-temperature">Temperature</option> -->
        </select>
        <label for="metric2">Unit Type:</label>
        <select name="unit Type" id="metric2">
          <option value="metric-input">Select Input</option>
          <!-- <option value="metric-input2">placeholder</option>
          <option value="metric-input3">placeholder</option>
          <option value="metric-input4">placeholder</option>
          <option value="metric-input5">placeholder</option> -->
        </select>
        <br><input id= "metric-input-number" type="number"></input>
      </div>
      <div class="arrow">
        <img src="${arrow}" alt="arrow" />
      </div>
      <div class="metric-output">
        <label for="metric-output-type">Value Type:</label>
        <select name="Value Type" id="metric3">
          <option value="metric-output">Select Output</option>
          <!-- <option value="metric-output1">placeholder</option>
          <option value="metric-output1">placeholder</option>
          <option value="metric-output1">placeholder</option>
          <option value="metric-output1">placeholder</option> -->
        </select>
        <br><input id= "metric-input-number" type="number"></input>
      </div>
    </div>
    <div class="metric-pdf">
      <h1>Todays Character is ${state.swapi.name}!</h1>
      <p>
      Originating from ${state.swapi.homeworld}, ${state.swapi.name} was born ${state.swapi.birth_year} as a ${state.swapi.gender}
      ${state.swapi.species} with ${state.swapi.eye_color} eyes and ${state.swapi.hair_color} hair. They can be seen in ${state.swapi.films}.
      </p>
    </div>
    <div class="metric-system">
      <img class="metric-img" src="${metricSystem}" alt="Metric System" />
    </div>
    <div class="metric-history">
      <h1>History of The Metric System</h1>
    </div>
    <div class="metric-history-info">
      <p>This is a placeholder for where the historical info will go.</p>
    </div>
  </main>
`;
