import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes.jsx";

function AppRoute() {
  return (
    <Routes>
      {routes.map((layout, index) => {
        const LayoutComponent = layout.element; // MainLayout или SecondLayout

        return (
          <Route
            key={index}
            element={<LayoutComponent />} // ← Оборачиваем в JSX здесь
          >
            {layout.children.map((child) => {
              // Если child.element — это функция (как у ProtectedRoute)
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

              // Обычный компонент — HomePage, LoginPage и т.д.
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
