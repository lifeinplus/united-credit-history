import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/main.scss";
import "./assets/js/main";

import App from "./App";
import Spinner from "./components/Spinner";
import { AuthProvider, ModalDataProvider, ThemeProvider } from "./contexts";

if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <Suspense fallback={<Spinner />}>
            <AuthProvider>
                <ModalDataProvider>
                    <ThemeProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </BrowserRouter>
                    </ThemeProvider>
                </ModalDataProvider>
            </AuthProvider>
        </Suspense>
    </StrictMode>
);
