import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Register from "@/pages/Register";
import LandingPage from "@/pages/LandingPage";
import NotFoundPage from "@/pages/NotFoundPage";


export default function RouteLayout() {

    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}