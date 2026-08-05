import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Register from "@/pages/Register";
// import LandingPage from "@/pages/LandingPage";
import NotFoundPage from "@/pages/NotFoundPage";
import CertificationProgress from "@/pages/CertificationProgress";
import { ROUTES } from "@/routes";

export default function RouteLayout() {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<RootLayout />}>
                <Route index element={<Register />} />
                <Route path="register" element={<Register />} />
                <Route path="progress" element={<CertificationProgress />} />
                <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}