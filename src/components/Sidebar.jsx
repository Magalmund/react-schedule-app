import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from "./SmallCalendar.jsx";
import Labels from "./Labels.jsx";
// import AddEmployee from "./AddEmployee.jsx";
import EmployeeList from "./EmployeeList.jsx";
import {useSelector} from "react-redux";

const Sidebar = () => {

    const isAuth = useSelector((state) => state.user.isAuth)

    return (
        <aside className="border border-gray-200 p-5 w-64">
            <CreateEventButton />
            <SmallCalendar/>
            <Labels/>
            {isAuth &&
                <React.Fragment>
                    {/*<AddEmployee/>*/}
                    <EmployeeList/>
                </React.Fragment>
            }

        </aside>
    );
};

export default Sidebar;
