/**
 * This code is part of routing layear implimentation in react
 * * This layout is use to render the dynamic component
 * ? wrap Outlet in Suspense component if using lazy loading
 */
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import NavBar from "../navBar/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
