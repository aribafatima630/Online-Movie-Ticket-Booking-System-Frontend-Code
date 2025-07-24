import Header from "../MyComponents/Header";
import Footer from "../MyComponents/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout () {
    return (

        <>

            <Header />
            <Outlet />
            <Footer />

        </>

    );
}