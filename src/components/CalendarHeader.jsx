import React, {useContext} from 'react';
import logo from '../assets/favicon.ico';
import GlobalContext from "../context/GlobalContext.jsx";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/userReducer.js";
import Button from "./UI/button/Button.jsx";

const CalendarHeader = () => {

    const {monthIndex, showLoginModal, setMonthIndex, setShowLoginModal, setShowEmployeesModal} = useContext(GlobalContext)

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth)

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }

    const handleReset = () => {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
    }

    return (
        <header className="px-4 py-2 grid grid-cols-4 items-center mb-[30px]">


            <div className="flex items-center">
                <img src={logo} alt="calendar" className="w-12 h-12"/>
                <h1 className="mr-10 ml-10 text-xl text-gray-500 font-bold">Calendar of PSE</h1>
            </div>


            <div>
                <Button onClick={handleReset}>
                    Today
                </Button>
                <Button onClick={handlePrevMonth} customClass="ml-4">
                <span className="material-icons-outlined align-middle cursor-pointer text-gray-600 mx-2">
                    chevron_left
                </span>
                </Button>
                <Button onClick={handleNextMonth} customClass="ml-4">
                <span className="material-icons-outlined align-middle cursor-pointer text-gray-600 mx-2">
                    chevron_right
                </span>
                </Button>
            </div>

            <h2 className="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>


            <div className="flex justify-end">
                {isAuth &&
                    <>
                        <Button
                            customClass="mr-4"
                            onClick={() => setShowEmployeesModal(true)}
                        >
                            Employees
                        </Button>
                        <Button
                            onClick={() => dispatch(logout())}
                            type="button"
                            customClass="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white transition-colors mr-4 cursor-pointer"
                        >
                            Logout
                        </Button>
                    </>
                }
                {!isAuth &&
                    <>
                        <Button
                            customClass="ml-4"
                            onClick={() => setShowLoginModal(true)}
                        >
                            Login
                        </Button>
                    </>
                }
            </div>
        </header>
    );
};

export default CalendarHeader;
