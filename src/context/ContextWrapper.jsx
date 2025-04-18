import React, {useEffect, useMemo, useReducer, useState} from 'react';
import GlobalContext from './GlobalContext.jsx';
import dayjs from "dayjs";
import axios from "axios";

const savedEventsReducer = (state, {type, payload}) => {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((event) => event.id === payload.id ? payload : event);
        case "delete":
            return state.filter((event) => event.id !== payload.id);
        default:
            throw new Error();
    }
}


const ContextWrapper = ({children}) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEmployeesModal, setShowEmployeesModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);
    const [labels, setLabels] = useState([]);


    const filteredEvents = useMemo(() => {
        return savedEvents.filter((event) =>
            labels.filter((label) => label.checked)
                .map(label => label.label)
                .includes(event.label)
        );
    }, [savedEvents, labels])

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map((event) => event.label))].map((label) => {
                const currentLabel = prevLabels.find((label) => label.label === label);
                const shifts = {
                    green: "day",
                    orange: "evening",
                    blue: "night"
                }

                return shifts[label] ? {
                    shift: shifts[label],
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                } : {
                    shift: `Unknown, color is ${label}`,
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                }
            });
        })
    }, [savedEvents]);

    useEffect(() => {
        if(!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal])

    const updateLabel = (label) => {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }


    const getAllShifts = async() => {
        try {
            const response = await axios.get('http://localhost:5001/api/shifts');
            const shifts = response.data;

            shifts.forEach (shift => {
                dispatchCalEvent({ type: 'push', payload: shift });
            })
        }catch (error) {
            console.error('Error getting shifts from database:', error);
            alert('Error getting shifts from database')
        }

    }

    useEffect(() => {
        getAllShifts();
    }, []);

    return (
        <GlobalContext.Provider value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            labels,
            setLabels,
            updateLabel,
            filteredEvents,
            getAllShifts,
            showLoginModal,
            setShowLoginModal,
            showEmployeesModal,
            setShowEmployeesModal
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
