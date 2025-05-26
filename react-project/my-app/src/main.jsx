import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'lib-flexible/flexible.js'



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
            <App />
        </ConfigProvider>
    </BrowserRouter>
)
