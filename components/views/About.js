import html from "html-literal";
import simpleConversions from "../../SimpleConversions/SCButterscotch.png";

export default () => html`
  <main>
    <div class="page-logo">
      <img
        src="${simpleConversions}"
        class="homepage-logo"
        alt="Simple Conversions"
      />
    </div>
    <div class="about-us-section">
      <p>
        this is a just a placeholder paragraph until I have completed the about
        me paragraph. I want to have a quick summary of why I chose this project
        for my capstone, how the information is helpful, and what functionality
        I hope to add to the site in the future.
      </p>
    </div>
  </main>
`;
