import React from "react"

const LayoutPage=React.lazy(()=>import('../pages/layout'))
const Linechart=React.lazy(()=>import('../pages/linechart/Linechart'))

const routes=[
    { path: '/', element: <LayoutPage />, auth: false, name: '/' },
    { path: '/Linechart', element: <Linechart />, auth: false, name: '/LayoutPage' }
]

export default routes;