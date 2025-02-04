import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar.jsx";
import Labels from "./Labels.jsx";
import AddEmployee from "./AddEmployee.jsx";

const Sidebar = () => {
    return (
        <aside className="border border-gray-200 p-5 w-64">
            <CreateEventButton />
            <SmallCalendar/>
            <Labels/>
            <AddEmployee/>
        </aside>
    );
};

export default Sidebar;
