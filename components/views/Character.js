import html from "html-literal";
export default state => html`
  <main>
    <div class="character">
      <h1>Todays Character is ${state.swapi.name}!</h1>
    </div>
    <div class="SW-iframe">
      <iframe
        class="character-info"
        src="https://starwars.fandom.com/wiki/
        ${state.swapi.name}"
        width="100%"
        height="750px"
      ></iframe>
      <p>
        Information is provided by the
        <a href="https://starwars.fandom.com/wiki/Main_Page"
          >Wookieepedia Fandom Page</a
        >
      </p>
    </div>
  </main>
`;
