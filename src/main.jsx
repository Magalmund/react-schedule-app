import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextWrapper from "./context/ContextWrapper.jsx";
import {store} from "./store/index.js";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ContextWrapper>
            <App/>
        </ContextWrapper>
    </Provider>

)
