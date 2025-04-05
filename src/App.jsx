import React, {useEffect} from 'react';
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Calendar from "./components/Calendar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./action/auth.js";

function App() {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <Router>
            <Routes>
                {/*{!isAuth &&*/}
                {/*    <Route path="/login" element={<LoginModal />} />*/}
                {/*}*/}
                <Route path="/" element={<Calendar />} />
                <Route path="*" element={<Calendar />} />
            </Routes>
        </Router>
    )
}

export default App
