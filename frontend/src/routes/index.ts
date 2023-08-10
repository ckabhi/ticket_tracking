/**
 * This file is part of react routing layer
 */
import React from "react";
import pathConstant from "./pathConstant";

const Authentication = React.lazy(
  () => import("../components/pages/Authentication")
);

const routes = [
  {
    path: pathConstant.HOME,
    element: <Authentication />,
  },
];

export default routes;
