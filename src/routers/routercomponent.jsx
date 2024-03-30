import React from "react"
import {Navigate} from 'react-router-dom'
const Layout=React.lazy(()=>import('../pages/layout'))
const Login=React.lazy(()=>import('../pages/login'))

const routes=[
    { path: '/', element: <Navigate  ator  to='/main'/>, auth: false, name: '/' },
    { path: '/main', element: <Layout />, auth: false, name: 'man', icon: 'PieChartOutlined' },
    { path: '/login', element: <Login />, auth: false, name: 'login', icon: 'DesktopOutlined'}
]

export default routes;