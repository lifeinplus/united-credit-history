import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import { ModalDelete, ModalEdit } from "../components";
import { useTheme } from "../contexts";

import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    const theme = useTheme();

    return (
        <>
            <Toaster
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: theme === "dark" ? "#2f343a" : "#f9f9fa",
                        color: theme === "dark" ? "#fff" : "#000",
                    },
                }}
            />
            <ModalDelete />
            <ModalEdit />
            <Header />
            <main>
                <div className="container-fluid">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
