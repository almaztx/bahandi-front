import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes.jsx";

function AppRoute() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
}
export default AppRoute;
