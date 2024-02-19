/**
 * This file is part of react routing layer
 */
import React from "react";
import pathConstant from "./pathConstant";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/pages/home/Dashboard";

const Authentication = React.lazy(
  () => import("../components/pages/authentication/Authentication")
);

const routes = [
  {
    path: pathConstant.LOGIN,
    element: <Authentication />,
  },
  {
    path: pathConstant.HOME,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

export default routes;
