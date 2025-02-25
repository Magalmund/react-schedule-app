import React, {useContext} from 'react';
import logo from '../assets/favicon.ico';
import GlobalContext from "../context/GlobalContext.jsx";
import dayjs from "dayjs";

const CalendarHeader = () => {

    const {monthIndex, setMonthIndex, saveShiftsToDatabase, getAllShifts} = useContext(GlobalContext)
    const handlePrevMonth = () => {
        console.log(monthIndex)
        setMonthIndex(monthIndex - 1);
    }
    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }

    const handleReset = () => {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
    }

    return (
        <header className="px-4 py-2 flex items-center">
            <img src={logo} alt="calendar" className="w-12 h-12"/>
            <h1 className="mr-10 ml-10 text-xl text-gray-500 font-bold">Calendar of PSE</h1>
            <button onClick={handleReset} className="border border-gray-200 rounded py-2 px-4 mr-5">
                Today
            </button>
            <button onClick={handlePrevMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_right
                </span>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
            <button
                type="button"
                onClick={saveShiftsToDatabase}
                className="ml-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white transition-colors mr-4"
            >
                Save to Database
            </button>
        </header>
    );
};

export default CalendarHeader;
