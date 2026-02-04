import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section>
      <h1>Page Not Found</h1>
      <p>
        Return to the <NavLink to="/dashboard">dashboard</NavLink>.
      </p>
    </section>
  );
};

export default NotFoundPage;
