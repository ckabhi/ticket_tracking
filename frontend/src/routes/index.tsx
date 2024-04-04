/**
 * This file is part of react routing layer
 */
import React from "react";
import pathConstant from "./pathConstant";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/pages/home/Dashboard";
import RedirectRoute from "./RedirectRoute";

const Authentication = React.lazy(
  () => import("../components/pages/authentication/Authentication")
);

const routes = [
  {
    path: pathConstant.LOGIN,
    element: (
      <RedirectRoute>
        <Authentication />
      </RedirectRoute>
    ),
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
