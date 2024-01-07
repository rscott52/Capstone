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
    <div class="character">
      <h1>Who Is Your Favorite Character?</h1>
    </div>
    <div class="favorite-form">
      <form id="favorite-character" method="POST" action="">
        <label for="characterName">Character Name:</label>
        <input
          type="text"
          name="characterName"
          id="characterName"
          placeholder="Enter Character Name"
          required
        />
        <input type="submit" name="submit" value="Submit Character" />
        <p>
          You can find information about the mentioned characters below by going
          to the
          <a href="https://starwars.fandom.com/wiki/Main_Page"
            >Wookieepedia Fandom Page</a
          >
          and searching for them.
        </p>
      </form>
    </div>

      <div id="character-table">
        <table id="characters">
          <tr>
            <th>Characters</th>
          </tr>
          ${state.characters
            .map(character => {
              return `<tr><td>${character.character}</td></tr>`;
            })
            .join("")}
        </table>
      </div>
    </div>
  </main>
`;
