import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../components/Shared/Loading";
import Header from "../components/Shared/Header";

const MainLayout = () => {
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <Loading />;
    }

    return <Outlet />;
};

export default MainLayout;
