import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Register from "@/pages/Register";
import NotFoundPage from "@/pages/NotFoundPage";


export default function RouteLayout() {

    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Register />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}