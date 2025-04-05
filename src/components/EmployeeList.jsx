import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Switch from "./UI/switch/Switch.jsx";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка сотрудников:', error);
            }
        };
        getEmployees();
    }, [employees]);

    return (
        <div className="mt-9">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee list</h2>
            <ul className="space-y-4">
                {employees.map((employee) => (
                    <div key={employee._id} className="flex items-center mt-4">
                        <Switch
                        >
                        </Switch>
                        <span className="ml-12 text-gray-700 capitalize">
                                {employee.name}
                            </span>
                    </div>
                ))}
            </ul>
        </div>
        // <div className="mt-9">
        //     <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee list</h2>
        //     <ul className="space-y-4">
        //         {employees.map((employee) => (
        //             <li
        //                 key={employee._id}
        //                 className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        //             >
        //                 <div className="flex justify-between items-center">
        //                     <span className="text-lg font-medium text-gray-700">{employee.name}</span>
        //                     <span className="text-sm text-gray-500">{employee.position}</span>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default EmployeeList;
