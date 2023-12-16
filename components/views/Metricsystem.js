import html from "html-literal";
import metricSystem from "../../MetricSystem/MSButterscotch.png";
import arrow from "../../ImperialSystem/arrowButterscotch.png";
export default () => html`
  <main>
    <div id="calculator-section">
      <div class="metric-calculator">
        <label for="metric-measurement-type">Measurement Type:</label>
        <select name="Measurement Type" id="metric-measurement-type">
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="volume">Volume</option>
          <option value="area">Area</option>
          <option value="temperature">Temperature</option>
        </select>
        <label for="metric-unit-type">Unit Type:</label>
        <select name="unit Type" id="metric-unit-type">
          <option value="length">placeholder</option>
          <option value="weight">placeholder</option>
          <option value="volume">placeholder</option>
          <option value="area">placeholder</option>
          <option value="temperature">placeholder</option>
        </select>
        <p>This is a place holder for where value to be converted is input</p>
      </div>
      <div class="arrow">
        <img src="${arrow}" alt="arrow" />
      </div>
      <div class="metric-output">
        <label for="imperial-output-type">Value Type:</label>
        <select name="Value Type" id="metric-output-type">
          <option value="length">placeholder</option>
          <option value="weight">placeholder</option>
          <option value="volume">placeholder</option>
          <option value="area">placeholder</option>
          <option value="temperature">placeholder</option>
        </select>
        <p>this is a placeholder for the output section</p>
      </div>
    </div>
    <div class="metric-pdf">
      <p>
        This is a place holder for where a pdf of common conversions will be
        generated based on the unit measurement type selected.
      </p>
    </div>
    <div class="metric-system">
      <img src="${metricSystem}" alt="Metric System" />
    </div>
    <div class="metric-history">
      <h1>History of The Metric System</h1>
    </div>
    <div class="metric-history-info">
      <p>This is a placeholder for where the historical info will go.</p>
    </div>
  </main>
`;
