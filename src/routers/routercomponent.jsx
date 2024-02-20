import React from "react"

// const LayoutPage=React.lazy(()=>import('../pages/layout'))
const Linechart=React.lazy(()=>import('../pages/linechart1/Linechart1'))

const routes=[
    { path: '/', element: <Linechart />, auth: false, name: '/' },
    { path: '/Linechart', element: <Linechart />, auth: false, name: '/LayoutPage', loader:()=>{console.log('qqq');return 1111} }
]

export default routes;