/**
 * useAuth - Custom React hook for managing user authentication details.
 * Retrieves user authentication information from the Redux store and decodes JWT tokens.
 * Returns an object containing user authentication details:
 * - username: The user's username.
 * - roles: An array of user roles.
 * - status: Represents the user's role status (Employee, Manager, Admin).
 * - isManager: Indicates if the user is a manager.
 * - isAdmin: Indicates if the user is an admin.
 */

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
const { default: jwt_decode } = require("jwt-decode");

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwt_decode(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
