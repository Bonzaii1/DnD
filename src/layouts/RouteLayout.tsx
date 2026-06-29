import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";


export default function RouteLayout() {

    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}