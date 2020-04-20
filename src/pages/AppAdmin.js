import React, { Component, useContext } from "react";
import { Header } from '../elements/Header';
import { ConfigContext } from "../App";

export const AppAdmin = () =>{

    const context = useContext(ConfigContext);

    return (
        <div className="App">
            <Header />
            <p>Admin here</p>
        </div>
    );
}

export default AppAdmin;