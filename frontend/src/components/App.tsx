import NavBar from "./navBar/NavBar";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Authentication from "./pages/Authentication";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />,
    },
  ]);

  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  );
}
