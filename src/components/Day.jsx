import React, {useContext, useEffect, useState} from 'react';
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext.jsx";

const Day = ({day, rowIdx}) => {
    const [dayEvents, setDayEvents] = useState([]);
    const {setDaySelected, setShowEventModal, setSelectedEvent, filteredEvents} = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(event => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
        setDayEvents(events)
    }, [filteredEvents])


    const getCurrentDayClass = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : ''
    }

    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
                )}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format("DD")}
                </p>
            </header>
            <div
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
                className="flex-1 cursor-pointer"
            >
                {dayEvents.map((event, idx) => (
                    <div key={idx}
                         onClick={() => setSelectedEvent(event)}
                         className={`bg-${event.label}-200 p-1 mr-3 text-${event.label}-600 text-sm text-center rounded mb-1 truncate`}
                    >
                        {event.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;
