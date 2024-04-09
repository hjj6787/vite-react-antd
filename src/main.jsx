import React from 'react'
import ReactDOM from 'react-dom/client'
import Routerpages from './routers'
import './App.css'
import { BrowserRouter} from "react-router-dom";
import request from './utils/request';
import { addRouteToMenu } from './utils/addroutertomenu';
const App=()=>{
  request.get('/api/user').then((res) => {
    addRouteToMenu(JSON.parse(JSON.stringify(res.data.data.menus)))
  }).catch((error) => {
    console.error("请求出错：", error);
  });
  return<>
    <Routerpages/>
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>,
)
