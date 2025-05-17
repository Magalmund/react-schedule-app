import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Switch from "./UI/switch/Switch.jsx";
import GlobalContext from "../context/GlobalContext.jsx";

const EmployeeList = () => {
    const {employeeLabel, updateEmployeeLabel} = useContext(GlobalContext);

    return (
        <div className="mt-9">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee list</h2>
            <ul className="space-y-4">
                {employeeLabel.length > 0 ? (
                    employeeLabel.map(({employeeId: employeeId, employeeName: employeeName, checked}) => (
                        <div key={employeeId} className="flex items-center mt-4">
                            <Switch
                                checked={checked}
                                onChange={() => updateEmployeeLabel({employeeId: employeeId, employeeName: employeeName, checked: !checked})}
                            >
                            </Switch>
                            <span className="ml-12 text-gray-700 capitalize">
                                {employeeName}
                            </span>
                        </div>
                    ))
                ) : (

                    <p className="text-gray-500 mt-3">No shifts available</p>
                )
                }
            </ul>
        </div>
    );
};

export default EmployeeList;
