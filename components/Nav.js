import html from "html-literal";

export default links => html`
  <nav class="header nav-bar">
    <div class="toggle-button">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <div><h1 class="brand-title">SimpleConversions</h1></div>
    <div class="nav-bar navbar-links">
      <ul class="nav-links">
        ${links
          .map(
            link =>
              `<li><a href="/${link.title}" class="nav-link" title="${link.title}" data-navigo>${link.text}</a></li>`
          )
          .join("")}
      </ul>
    </div>
  </nav>
`;
