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
      <h1>About This Site</h1>
      <p>
        Welcome to Simple Conversions! As you navigate and use this site, we
        hope you find it helpful, but most important, SIMPLE! We know
        conversions can be tedious and annoying sometimes, so our aim is to make
        them as simple and quick as possible. Want to convert a Metric
        measurement to US/Imperial? Take a look at our
        <a class="about-this-site-links" href=${"Imperialsystem"}
          >US/Imperial Page!</a
        >
        How about an US/Imperial measurement to Metric? Then the
        <a class="about-this-site-links" href=${"Metricsystem"}>Metric Page</a>
        is for you! Interested in learning how to read or take a measurement?
        Check out our
        <a class="about-this-site-links" href=${"Learningtools"}
          >Learning Tools Page</a
        >! Notice an issue, have a request, or just some good old fashioned
        feedback? Let us know by visiting our
        <a class="about-this-site-links" href=${"Contact"}>Contact Us Page</a>
        and creating a submission. We hope as you utilize this site, you will
        enjoy its simplicity and find the exact conversion you need!
      </p>

      <h1>Why Conversions?</h1>
      <p>
        One Evening, as my wife and I were in the process of making dinner, we
        both began to complain about having to figure out measurement
        conversions. We wanted an easier way to quickly plug in a number and get
        exactly what we needed. Thus, Simple Conversions was born! Whether you
        are cooking, traveling, trying to find a temperature difference, or
        measure the size of a area, this site will be able to help you find a
        fast and simple solution to your conversion!
      </p>

      <h1>Why Metric and US/Imperial?</h1>
      <p>
        The answer is simple! The Metric System is by far the most popular
        measurement system in the world today. As for the US/Imperial System,
        there are still a few countries that utilize these measurements (Looking
        at you United States...). Since these two systems are the most popular,
        widely used, it was a no brainer to start with them!
      </p>

      <h1>Future Site Plans</h1>
      <p>
        As with any good side project, continual development and growth is a
        must! In the future we hope to have the Learning Tools Page completed
        with quizes and helpful tutorials on how to take proper measurements.
        This will include how to properly read them as well! If you have any
        suggestions or feedback for future features, please let us know!
      </p>
    </div>
  </main>
`;
