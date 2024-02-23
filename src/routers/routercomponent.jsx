import React from "react"

// const LayoutPage=React.lazy(()=>import('../pages/layout'))
const Linechart1=React.lazy(()=>import('../pages/linechart1/Linechart1'))
const Linechart2=React.lazy(()=>import('../pages/linechart2/Linechart2'))


const routes=[
    { path: '/', element: <Linechart1 />, auth: false, name: '/' },
    { path: '/Linechart1', element: <Linechart1 />, auth: false, name: 'LayoutPage1', icon: 'PieChartOutlined' },
    { path: '/Linechart2', element: <Linechart2 />, auth: false, name: 'LayoutPage2', icon: 'DesktopOutlined'}
]

export default routes;