/**
 * DashFooter Component
 *
 * This component represents the footer section of the dashboard in the application.
 * It displays information such as the current user's username and status,
 * and includes a button to navigate back to the main dashboard if the current route is not "/dash".
 *
 * Components:
 * - FontAwesomeIcon: Component to render Font Awesome icons
 * - useNavigate: Hook from react-router-dom for navigation within the app
 * - useLocation: Hook from react-router-dom to get the current location pathname
 * - useAuth: Custom hook for retrieving authentication-related data
 *
 * Functions:
 * - onGoHomeClicked: Navigates to the main dashboard ("/dash") on button click
 *
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button className="dash-footer__button icon-button" title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
  return content;
};
export default DashFooter;
