import html from "html-literal";
import imperialSystem from "../../ImperialSystem/ISButterscotch.png";
import arrow from "../../ImperialSystem/arrowButterscotch.png";
export default () => html`
  <main>
    <div id="calculator-section">
      <div class="imperial-calculator">
        <label for="imperial-measurement-type">Measurement Type:</label>
        <select id = "imperial1" name="Measurement Type" id="imperial-measurement-type">
          <option value="imperial-measurement">Select Input</option>
          <!-- <option value="imperial-weight">Weight</option>
          <option value="imperial-volume">Volume</option>
          <option value="imperial-area">Area</option>
          <option value="imperial-temperature">Temperature</option> -->
        </select>
        <label for="imperial-unit-type">Unit Type:</label>
        <select id = "imperial2" name="unit Type" id="imperial-unit-type">
          <option value="imperial-input">Select input</option>
          <!-- <option value="imperial-input2">placeholder</option>
          <option value="imperial-input3">placeholder</option>
          <option value="imperial-input4">placeholder</option>
          <option value="imperial-input5">placeholder</option> -->
        </select>
        <br><input type="number"></input>
      </div>
      <div class="arrow">
        <img src="${arrow}" alt="arrow" />
      </div>
      <div class="imperial-output">
        <label for="imperial-output-type">Value Type:</label>
        <select id = "imperial3" name="Value Type" id="imperial-output-type">
          <option value="imperial-output">Select Output</option>
          <!-- <option value="imperial-output2">placeholder</option>
          <option value="imperial-output3">placeholder</option>
          <option value="imperial-output4">placeholder</option>
          <option value="imperial-output5">placeholder</option> -->
        </select>
        <br><input type="number"></input>
      </div>
    </div>
    <!-- <div class="imperial-pdf">
      <p>
        This is a place holder for where a pdf of common conversions will be
        generated based on the unit measurement type selected.
      </p>
    </div> -->
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
