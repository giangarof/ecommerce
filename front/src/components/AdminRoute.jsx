import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function AdminRoute() {
    const {userInfo} = useSelector(state => state.auth);
    console.log(userInfo)

    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/' replace/>;
}