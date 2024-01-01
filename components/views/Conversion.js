import html from "html-literal";
import metricSystem from "../../MetricSystem/MSButterscotch.png";
import imperialSystem from "../../ImperialSystem/ISButterscotch.png";
import arrow from "../../ImperialSystem/arrowButterscotch.png";
export default () => html`
  <main>
    <div id="calculator-section">
      <div class="metric-calculator">
        <label for="input1">Measurement Type:</label>
        <select name="Measurement Type" id="input1">
          <option value="input1">Select Input</option>
        </select>
        <label for="input2">Unit Type:</label>
        <select name="unit Type" id="input2">
          <option value="input2">Select Input</option>
        </select>
        <br><input id= "input-number" type="number"></input>
      </div>
      <div class="arrow">
        <img src="${arrow}" alt="arrow" />
      </div>
      <div class="metric-output">
        <label for="metric-output-type">Value Type:</label>
        <select name="Value Type" id="output">
          <option value="output">Select Output</option>
        </select>
        <br><input id= "output-number" type="number"></input>
        <br><p> * PLEASE NOTE THESE ARE APPROXIMATE RESULTS</p>
      </div>
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
    <div class="imperial-system">
      <img class="imperial-img" src="${imperialSystem}" />
    </div>
    <div class="imperial-history">
      <h1>History of The Imperial System</h1>
    </div>
    <div class="imperial-history-info">
      <p>This is a placeholder for where the historical info will go.</p>
    </div>
  </main>
`;
