import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../context/GlobalContext.jsx";
import axios from "axios";

const labelsClasses = ["green", "orange", "blue"]

const EventModal = () => {
    const {setShowEventModal, daySelected, dispatchCalEvent, selectedEvent} = useContext(GlobalContext);

    console.log(selectedEvent)

    const [employeeId, setEmployeeId] = useState(selectedEvent ? selectedEvent.id : null);
    const [employee, setEmployee] = useState(selectedEvent ? selectedEvent.employee : "Choose employee");
    const [getEmployees, setGetEmployees] = useState([]);
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelsClasses.find(label => label === selectedEvent.label) : labelsClasses[0]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const calendarEvent = {
            employeeId: employeeId,
            employee: employee,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        }
        if (selectedEvent) {
            dispatchCalEvent({type: 'update', payload: calendarEvent});
        } else {
            dispatchCalEvent({type: 'push', payload: calendarEvent});
        }

        setShowEventModal(false);
    }

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/employees');
                setGetEmployees(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка сотрудников:', error);
            }
        }
        getEmployees();
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000054] bg-opacity-50">
            <form className="bg-white rounded-lg shadow-2xl w-1/4 overflow-hidden">
                {/* Header */}
                <header className="bg-gray-100 px-6 py-4 flex justify-between items-center border-b border-gray-200">
                    <span className="material-icons-outlined text-gray-500 cursor-move">drag_handle</span>
                    <div className="flex items-center gap-3">
                        {selectedEvent && (
                            <button
                                onClick={() => {
                                    dispatchCalEvent({type: 'delete', payload: selectedEvent});
                                    setShowEventModal(false);
                                }}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <span className="material-icons-outlined">delete</span>
                            </button>
                        )}
                        <button
                            onClick={() => setShowEventModal(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <span className="material-icons-outlined">close</span>
                        </button>
                    </div>
                </header>

                {/* Body */}
                <div className="p-6">
                    <div className="space-y-6">
                        {/* Employee Selection */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Choose the employee</label>
                            <select
                                value={employee}
                                onChange={(e) => {
                                    const selectedEmployee = getEmployees.find(emp => emp.name === e.target.value);
                                    setEmployee(selectedEmployee.name);
                                    setEmployeeId(selectedEmployee._id);
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Choose employee">Choose employee</option>
                                {getEmployees.map((employee) => (
                                    <option key={employee._id} value={employee.name}>
                                        {employee.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Display */}
                        <div className="flex items-center space-x-3">
                            <span className="material-icons-outlined text-gray-500">schedule</span>
                            <p className="text-gray-700">{daySelected.format('dddd, MMMM DD')}</p>
                        </div>

                        {/* Description Input */}
                        <div className="flex items-center space-x-3">
                            <span className="material-icons-outlined text-gray-500">segment</span>
                            <input
                                type="text"
                                name="description"
                                placeholder="Add a Description"
                                value={description}
                                required
                                className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Label Selection */}
                        <div className="flex items-center space-x-3">
                            <span className="material-icons-outlined text-gray-500">bookmark_border</span>
                            <div className="flex space-x-2">
                                {labelsClasses.map((label, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedLabel(label)}
                                        style={{backgroundColor: `var(--color-${label}-500)`}}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110`}
                                    >
                                        {selectedLabel === label && (
                                            <span className="material-icons-outlined text-white text-sm">check</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex justify-end p-4 border-t border-gray-200">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition-colors"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;
