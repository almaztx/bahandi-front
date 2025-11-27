import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes.jsx";

function AppRoute() {
    return (
        <Routes>
            {routes.map((layout, index) => {
                const LayoutComponent = layout.element;

                return (
                    <Route key={index} element={<LayoutComponent />}>
                        {layout.children.map((child) => {
                            if (
                                typeof child.element === "function" &&
                                !child.element.prototype?.isReactComponent
                            ) {
                                const LazyComponent = child.element;
                                return (
                                    <Route
                                        key={child.path}
                                        path={child.path}
                                        element={<LazyComponent />}
                                    />
                                );
                            }

                            const ChildComponent = child.element;
                            return (
                                <Route
                                    key={child.path}
                                    path={child.path}
                                    element={<ChildComponent />}
                                />
                            );
                        })}
                    </Route>
                );
            })}
        </Routes>
    );
}
export default AppRoute;
