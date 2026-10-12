import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserIndexPage from "../pages/users";
import ComponentCatalogPage from "../pages/ComponentCatalogPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserIndexPage />} />
        <Route path="/catalog" element={<ComponentCatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
