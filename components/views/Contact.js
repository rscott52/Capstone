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
    <div class="contact-us-section">
      <form action="https://formspree.io/f/mrgnzgjn" method="POST">
        <div class="contact-form">
          <label for="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            required
          />
          <label for="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            required
          />
          <label for="issue-type">Contact Reason:</label>
          <select name="Contact Reason" id="issue-type">
            <option value="other">Other</option>
            <option value="issue">Website Issue</option>
            <option value="suggestion">Suggestion</option>
            <option value="request">Request</option>
          </select>
        </div>
        <div class="contact-form-message">
          <label for="msg"></label>
          <textarea name="msg" id="msg" cols="50" rows="20"></textarea>
        </div>
        <div class="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </main>
`;
