import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../context/GlobalContext.jsx";
import axios from "axios";
import Modal from "./UI/modal/Modal.jsx";
import Dropdown from "./UI/dropdown/Dropdown.jsx";
import Radio from "./UI/radio/Radio.jsx";
import Button from "./UI/button/Button.jsx";
import Input from "./UI/input/Input.jsx";

const labelsClasses = ["green", "orange", "blue", "purple", "yellow", "gray"]

const EventModal = () => {
    const {setShowEventModal, daySelected, dispatchCalEvent, selectedEvent} = useContext(GlobalContext);

    const [employeeId, setEmployeeId] = useState(selectedEvent ? selectedEvent.employeeId : null);
    const [employee, setEmployee] = useState(selectedEvent ? selectedEvent.employee : "Choose employee");
    const [getEmployees, setGetEmployees] = useState([]);
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelsClasses.find(label => label === selectedEvent.label) : labelsClasses[0]);


    const handleSubmit = async(e) => {
        e.preventDefault();

        const calendarEvent = {
            _id: selectedEvent?._id,
            employeeId: employeeId,
            employee: employee,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
        }

        try {
            let pushEvent;

            if (selectedEvent) {
                const response = await axios.put(`http://localhost:5001/api/shifts/${selectedEvent._id}`, calendarEvent);
            } else {
                const response = await axios.post('http://localhost:5001/api/shifts', calendarEvent);
                pushEvent = response.data;
            }
            if (selectedEvent) {
                console.log(calendarEvent);
                dispatchCalEvent({type: 'update', payload: calendarEvent});
            } else {
                dispatchCalEvent({type: 'push', payload: pushEvent});
            }

            setShowEventModal(false);
        } catch (e) {
            console.error('Error saving/updating shift to database:', e);
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        if(selectedEvent) {
            try {
                await axios.delete(`http://localhost:5001/api/shifts/${selectedEvent._id}`);
                console.log('Shifts deleted from database:', selectedEvent);
            } catch (e) {
                console.error('Error deleting shift from database:', e);
            }
            dispatchCalEvent({type: 'delete', payload: selectedEvent});
            setShowEventModal(false);
        }
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
        <Modal setShowModal={setShowEventModal}>
            {/* Header */}
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowEventModal(false)}
                        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                        <span className="material-icons-outlined">close</span>
                    </button>
                    {selectedEvent && (
                        <button
                            onClick={handleDelete}
                            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                        >
                            <span className="material-icons-outlined">delete</span>
                        </button>
                    )}
                </div>
            </header>

            <div className="content-header text-center mb-4">
                <h2 className="text-[#31344b] text-2xl">Shift</h2>
            </div>

            {/* Body */}
            <div className="p-6">
                <div className="space-y-6">
                    {/* Employee Selection */}
                    <div className="flex items-center space-x-3">
                        <span className="material-icons-outlined text-gray-500">person</span>
                        <Dropdown
                            data={getEmployees}
                            selectedOption={employee}
                            setSelectedOption={setEmployee}
                            setSelectedId={setEmployeeId}
                        >
                        </Dropdown>
                    </div>
                    {/* Date Display */}
                    <div className="flex items-center space-x-3">
                        <span className="material-icons-outlined text-gray-500">schedule</span>
                        <p className="text-gray-700">{daySelected.format('dddd, MMMM DD')}</p>
                    </div>

                    {/* Description Input */}
                    <div className="flex items-center space-x-3">
                        <span className="material-icons-outlined text-gray-500">segment</span>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Add a Description"
                            value={description}
                            className="w-full p-2 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Label Selection */}
                    <div className="flex items-center space-x-3">
                        <span
                            className="material-icons-outlined transition duration-300 ease-out"
                            style={{color: `var(--color-${selectedLabel}-500)`}}
                        >
                            bookmark_border
                        </span>
                        <Radio
                            className="flex"
                            data={labelsClasses}
                            selected={selectedLabel || ''}
                            setSelected={setSelectedLabel}
                        >
                        </Radio>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="flex justify-end p-4">
                <Button
                    type="submit"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </footer>
        </Modal>

    );
};

export default EventModal;
