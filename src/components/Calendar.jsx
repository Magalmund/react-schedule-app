import React, {useContext, useEffect, useState} from 'react';
import EventModal from "./EventModal.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import Sidebar from "./Sidebar.jsx";
import Month from "./Month.jsx";
import {getMonth} from "../utils.js";
import GlobalContext from "../context/GlobalContext.jsx";
import LoginModal from "./LoginModal.jsx";
import EmployeeModal from "./EmployeeModal.jsx";

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex, showEventModal, showLoginModal, showEmployeesModal} = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex]);

    return (
        <React.Fragment>
            {showEventModal && <EventModal/>}
            {showLoginModal && <LoginModal/>}
            {showEmployeesModal && <EmployeeModal/>}
            <div className="flex flex-col">
                <CalendarHeader/>
                <div className="flex flex-1 min-h-screen">
                    <Sidebar/>
                    <Month month={currentMonth}/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Calendar;
