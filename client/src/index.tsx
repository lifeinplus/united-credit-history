import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/main.scss";
import "./assets/js/main";

import App from "./App";
import Spinner from "./components/Spinner";
import { ProfileProvider, ThemeProvider } from "./contexts";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <ThemeProvider>
                    <ProfileProvider>
                        <App />
                    </ProfileProvider>
                </ThemeProvider>
            </BrowserRouter>
        </Suspense>
    </StrictMode>
);
