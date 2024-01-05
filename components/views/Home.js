import html from "html-literal";
import simpleConversions from "../../SimpleConversions/SCButterscotch.png";
import imperialSystem from "../../ImperialSystem/ISButterscotch.png";
import metricSystem from "../../MetricSystem/MSButterscotch.png";
export default () => html`
  <main>
    <div class="page-logo">
      <img
        src="${simpleConversions}"
        class="homepage-logo"
        alt="Simple Conversions"
      />
    </div>
    <div class="favorite-system-selector">
      <img
        class="index-system-image"
        src="${imperialSystem}"
        alt="Imperial System"
      />
      <img
        class="index-system-image"
        src="${metricSystem}"
        alt="Metric System"
      />
    </div>
    <div class="system-preference">
      <h1>Which System Do You Prefer?</h1>
    </div>
  </main>
`;
