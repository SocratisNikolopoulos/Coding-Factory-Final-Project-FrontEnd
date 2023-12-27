/**
 * Layout Component
 *
 * This component serves as a layout container using React Router's Outlet feature.
 * It acts as a placeholder where child components defined in routes will be rendered.
 *
 * Components:
 * - Uses React Router's Outlet to render child components based on defined routes
 *
 */

import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
