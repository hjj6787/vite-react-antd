import React from "react"

const LayoutPage=React.lazy(()=>import('../pages/layout'))

const routes=[
    { path: '/', element: <LayoutPage />, auth: false, name: '/' },
    { path: '/LayoutPage', element: <LayoutPage />, auth: false, name: '/LayoutPage' }
]

export default routes;