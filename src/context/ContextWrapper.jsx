import React, {useEffect, useMemo, useReducer, useState} from 'react';
import GlobalContext from './GlobalContext.jsx';
import dayjs from "dayjs";
import axios from "axios";
import {getAllEmployees} from "../action/employees.js";

const savedEventsReducer = (state, {type, payload}) => {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((event) => event._id === payload._id ? payload : event);
        case "delete":
            return state.filter((event) => event._id !== payload._id);
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
    const [employees, setEmployees] = useState([]);
    const [employeeLabel, setEmployeeLabel] = useState([]);


    const filteredEvents = useMemo(() => {
        return savedEvents.filter((event) =>
            labels.filter((label) => label.checked)
                .map(label => label.label)
                .includes(event.label)
        );
    }, [savedEvents, labels])


    const filteredEventsByUser = useMemo(() => {
        return filteredEvents.filter((event) =>
            employeeLabel.filter((label) => label.checked)
                .map(label => label.employeeId)
                .includes(event.employeeId)
        )
    },[filteredEvents, employeeLabel])

    const updateEmployeeLabel = (updatedLabel) => {
        setEmployeeLabel(employeeLabel.map((label) => label.employeeId === updatedLabel.employeeId ? updatedLabel : label))
    }

    const updateLabel = (label) => {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        setEmployeeLabel(() => {
            return employees.map(employee => ({
                employeeId: employee._id,
                employeeName: employee.name,
                checked: true,
            }));
        });
    }, [savedEvents, employees])


    useEffect(() => {
        setLabels(() => {
            return [...new Set(savedEvents.map((event) => event.label))].map((label) => {

                const shifts = {
                    green: "day",
                    orange: "evening",
                    blue: "night",
                    purple: "core",
                    yellow: "sick day",
                    gray: "other"
                }

                return shifts[label] ? {
                    shift: shifts[label],
                    label,
                    checked: true
                } : {
                    shift: `Unknown, color is ${label}`,
                    label,
                    checked: true
                }
            });
        })
    }, [savedEvents]);

    useEffect(() => {
        if(!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal])


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

    useEffect(() => {
        getAllEmployees(setEmployees);
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
            setShowEmployeesModal,
            employeeLabel,
            setEmployeeLabel,
            filteredEventsByUser,
            updateEmployeeLabel,
            employees,
            setEmployees
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
