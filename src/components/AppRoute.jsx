import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";

function AppRoute() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element/>}></Route>
            ))}
        </Routes>
    )
}
export default AppRoute;