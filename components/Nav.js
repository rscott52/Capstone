import html from "html-literal";

export default links => html`
  <nav class="nav-bar">
    <!-- <div><a href="index.html" class="brand-title">SimpleConversions</a></div> -->
    <a href="#" class="toggle-button">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </a>
    <div class="navbar-links">
      <ul>
        ${links
          .map(
            link =>
              `<li><a href="/${link.title}" class:"nav-link title="${link.title}" data-navigo>${link.text}</a></li>`
          )
          .join("")}
      </ul>
    </div>
  </nav>
`;
