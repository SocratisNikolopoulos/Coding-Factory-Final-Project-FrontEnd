/**
 * Public Component
 *
 * This component defines the public-facing information for Soc N. Repairs,
 * showcasing the business details, location, and contact information.
 * It includes a welcome message, service details, address, and an option
 * for employees to log in.
 *
 * Components:
 * - Header with the business title
 * - Main content displaying service information and contact details
 * - Footer containing a link for employee login
 *
 */

import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Soc N. Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Located in the heart of Athens, Soc N. Repairs provides a trained staff ready to meet your guitar and bass repair needs.</p>
        <address className="public__addr">
          Soc N. Repairs
          <br />
          666 Foo Street
          <br />
          Athens City, CA 10432
          <br />
          <a href="tel:2100000000">2100000000</a>
        </address>
        <br />
        <p>Owner: Socratis Nikolopoulos</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
