import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes, adminRoutes} from '../routes';
import {Context} from '../index';
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return ( 
        <Routes>
            {user.role === "ADMIN" && adminRoutes.map(({path, Component}) => 
                <Route key = {path} path = {path} element = {Component}/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key = {path} path = {path} element = {Component}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key = {path} path = {path} element = {Component}/>
            )}
            <Route path = "/*" element = {<Navigate replace to = {SHOP_ROUTE}/>}/>
        </Routes>
    );
})

export default AppRouter;