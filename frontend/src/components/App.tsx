import NavBar from "./navBar/NavBar";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// import Authentication from "./pages/Authentication";
import Layout from "./layout/Layout";
import routes from "../routes";

export function App() {
  const router = createBrowserRouter([
    {
      // path: "/",
      // element: <Authentication />,
      element: <Layout />,
      // TODO:: Error element is used to render the page if path is not existed
      // errorElement: <ErrorPage/>
      children: routes,
    },
  ]);

  return (
    <>
      {/* <NavBar /> */}
      <RouterProvider router={router} />
    </>
  );
}
