import React, {useContext, useEffect, useState} from 'react';
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext.jsx";
import Card from "./UI/card/Card.jsx";
import {useDispatch, useSelector} from "react-redux";

const Day = ({day, rowIdx}) => {
    const [dayEvents, setDayEvents] = useState([]);
    const {setDaySelected, setShowEventModal, setSelectedEvent, filteredEventsByUser} = useContext(GlobalContext);

    // const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth)

    useEffect(() => {
        const events = filteredEventsByUser.filter(event => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
        setDayEvents(events)
    }, [filteredEventsByUser, day])


    const getCurrentDayClass = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : ''
    }


     const handleDaySelected = () => {
        if(isAuth) {
            setDaySelected(day);
            setShowEventModal(true);
        } else {
            alert("Please log in to shift management system")
        }
    }


    return (
        <Card onClick={handleDaySelected}>
            <div className="flex flex-col">
                <header className="flex flex-col items-center">
                    {rowIdx === 0 && (
                        <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
                    )}
                    <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                        {day.format("DD")}
                    </p>
                </header>
                <div
                    className="flex-1 cursor-pointer"
                >
                    {dayEvents.map((event, idx) => (
                        <div key={idx}
                             onClick={() => setSelectedEvent(event)}
                             style={{backgroundColor: `var(--color-${event.label}-300)`}}
                             className={`p-1 text-gray-600 text-sm text-center rounded m-2 truncate`}
                        >
                            {event.employee}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default Day;
