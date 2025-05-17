import React, {useContext, useEffect, useState} from 'react';
import Modal from "./UI/modal/Modal.jsx";
import axios from "axios";
import Button from "./UI/button/Button.jsx";
import GlobalContext from "../context/GlobalContext.jsx";
import Input from "./UI/input/Input.jsx";
import {getAllEmployees} from "../action/employees.js";

const EmployeeModal = () => {
    const [name, setName] = useState('');
    const [nameAddField, setNameAddField] = useState('');
    const [editId, setEditId] = useState('')
    const [employeesList, setEmployeesList] = useState([]);

    const {setShowEmployeesModal} = useContext(GlobalContext);

    useEffect(() => {
        getAllEmployees(setEmployeesList)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/employees', {
                name: nameAddField
            });
            alert('Employee added successfully.');
            setNameAddField('');
            setEmployeesList([])
            getAllEmployees(setEmployeesList);
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Error adding employee');
        }
    }

    const handleEdit = (id, name) => {
        setEditId(id);
        setName(name)
    }

    const handleSave = async (id) => {
        setEditId('');

        try {
            await axios.put(`http://localhost:5001/api/employees/${id}`, {
                name: name
            });
            setName('');
            setEditId('');
            setEmployeesList([]);
            getAllEmployees(setEmployeesList);
        } catch (e) {
            console.error('Error updating employee to database:', e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/employees/${id}`);
            console.log('Shifts deleted from database:', id);
            setEmployeesList([]);
            getAllEmployees(setEmployeesList);
        } catch (e) {
            console.error('Error deleting shift from database:', e);
        }
    }


    return (
        <Modal setShowModal={setShowEmployeesModal}>
            <button
                type="button"
                onClick={() => setShowEmployeesModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer flex items-center mr-auto"
            >
                <span className="material-icons-outlined">close</span>
            </button>

            <div className="content-header p-[1.25rem 1.5rem 0 1.25rem] text-center mt-4">
                <h2 className="text-[#31344b] text-2xl">Employees</h2>
            </div>
            <div className="content-body flex-[1_1_0] block flex-wrap p-[1.5rem]">
                <div className="mt-4">

                    {employeesList.map(employee => (
                        <div key={employee._id} className="form-group">
                            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                <div className="flex">
                                <span
                                    className="material-icons-outlined flex items-center p-[.6rem_.75rem] mb-0 text-[1rem] text-[#44476a] text-center whitespace-nowrap bg-[#e6e7ee] border-[.0625rem] border-solid border-[#d1d9e6] rounded-lg rounded-br-none rounded-tr-none">
                                    person
                                </span>
                                </div>
                                <Input
                                    type="text"
                                    value={editId !== employee._id ? employee.name : name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={editId !== employee._id}
                                    customClass={`${editId !== employee._id ? "!shadow-none" : ""}` + " flex-[1_1_0] !rounded-tl-none !rounded-bl-none !border-l-[0px]"}
                                />
                                {editId !== employee._id
                                    ?
                                    <Button
                                        type="button"
                                        onClick={() => handleEdit(employee._id, employee.name)}
                                        customClass="material-icons-outlined ml-2"
                                    >
                                        edit
                                    </Button>
                                    :
                                    <Button
                                        type="button"
                                        onClick={() => handleSave(employee._id)}
                                        customClass="material-icons-outlined ml-2"
                                    >
                                        check
                                    </Button>
                                }

                                <Button
                                    type="button"
                                    onClick={() => handleDelete(employee._id)}
                                    customClass="material-icons-outlined ml-2"
                                >
                                    delete
                                </Button>
                            </div>
                        </div>
                    ))}


                    <div className="form-group">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <div className="flex">
                                <span
                                    className="material-icons-outlined flex items-center p-[.6rem_.75rem] mb-0 text-[1rem] text-[#44476a] text-center whitespace-nowrap bg-[#e6e7ee] border-[.0625rem] border-solid border-[#d1d9e6] rounded-lg rounded-br-none rounded-tr-none">
                                    person
                                </span>
                            </div>
                            <Input
                                type="text"
                                value={nameAddField}
                                onChange={(e) => setNameAddField(e.target.value)}
                                required
                                customClass="!rounded-tl-none !rounded-bl-none !border-l-[0px] flex-[1_1_0]"
                            />
                            <Button onClick={handleSubmit} customClass="material-icons-outlined ml-2">check</Button>
                        </div>
                    </div>

                </div>
            </div>
        </Modal>
    );
};

export default EmployeeModal;
