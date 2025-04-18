import React, {createContext} from 'react';

const GlobalContext = createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendars: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: () => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({type, payload}) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    labels: [],
    setLabels: () => {},
    updateLabel: () => {},
    filteredEvents: () => {},
    getAllShifts: () => {},
    showLoginModal: false,
    setShowLoginModal: () => {},
    showEmployeesModal: false,
    setShowEmployeesModal: () => {},
});

export default GlobalContext;

