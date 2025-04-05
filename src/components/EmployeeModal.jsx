import React, {useContext, useState} from 'react';
import Modal from "./UI/modal/Modal.jsx";
import axios from "axios";
import Button from "./UI/button/Button.jsx";

import GlobalContext from "../context/GlobalContext.jsx";
import Input from "./UI/input/Input.jsx";

const EmployeeModal = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const {setShowEmployeesModal} = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/employees', {
                name,
                position,
            });
            alert('Сотрудник успешно добавлен');
            setName('');
            setPosition('');
        } catch (error) {
            console.error('Ошибка при добавлении сотрудника:', error);
            alert('Ошибка при добавлении сотрудника');
        }
    }


    return (
        <Modal>
            <button
                onClick={() => setShowEmployeesModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer flex items-center mr-auto"
            >
                <span className="material-icons-outlined">close</span>
            </button>

            <div className="content-header p-[1.25rem 1.5rem 0 1.25rem] text-center mt-4">
                <h2 className="text-[#31344b] text-2xl">Add new employee</h2>
                {/*<span>Login here using your username and password</span>*/}
            </div>
            <div className="content-body flex-[1_1_0] block flex-wrap p-[1.5rem]">
                <div className="mt-4">
                    <div className="form-group">
                        <label className="inline-block mb-[.5rem] text-[.875rem]">
                            Name and Lastname
                        </label>
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <div className="flex">
                                <span
                                    className="material-icons-outlined flex items-center p-[.6rem_.75rem] mb-0 text-[1rem] text-[#44476a] text-center whitespace-nowrap bg-[#e6e7ee] border-[.0625rem] border-solid border-[#d1d9e6] rounded-lg rounded-br-none rounded-tr-none">
                                    person
                                </span>
                            </div>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                customClass="!rounded-tl-none !rounded-bl-none !border-l-[0px] flex-[1_1_0]"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="inline-block mb-[.5rem] text-[.875rem]">
                            Position
                        </label>
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <div className="flex">
                                <span
                                    className="material-icons-outlined flex items-center p-[.6rem_.75rem] mb-0 text-[1rem] text-[#44476a] text-center whitespace-nowrap bg-[#e6e7ee] border-[.0625rem] border-solid border-[#d1d9e6] rounded-lg rounded-br-none rounded-tr-none">
                                    work
                                </span>
                            </div>
                            <Input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                                customClass="!rounded-tl-none !rounded-bl-none !border-l-[0px] flex-[1_1_0]"
                            />
                        </div>
                    </div>
                    <Button customClass="w-full" onClick={handleSubmit}>
                        Add
                    </Button>
                </div>
            </div>

            {/*<div className="mt-4">*/}
            {/*    <div className="mb-4">*/}
            {/*        <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>*/}
            {/*        <Input*/}
            {/*            type="text"*/}
            {/*            value={name}*/}
            {/*            onChange={(e) => setName(e.target.value)}*/}
            {/*            required*/}
            {/*            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="mb-4">*/}
            {/*        <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>*/}
            {/*        <Input*/}
            {/*            type="text"*/}
            {/*            value={position}*/}
            {/*            onChange={(e) => setPosition(e.target.value)}*/}
            {/*            required*/}
            {/*            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <Button*/}
            {/*        onClick={handleSubmit}*/}
            {/*        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
            {/*    >*/}
            {/*        Add*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </Modal>
    );
};

export default EmployeeModal;
