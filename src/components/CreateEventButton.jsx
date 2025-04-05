import React, {useContext} from 'react';
import plusImg from '../assets/plus.svg';
import GlobalContext from "../context/GlobalContext.jsx";
import Button from "./UI/button/Button.jsx";
import {useSelector} from "react-redux";
const CreateEventButton = () => {

    const {setShowEventModal} = useContext(GlobalContext);
    const isAuth = useSelector((state) => state.user.isAuth)

    return (
        // <button onClick={() => setShowEventModal(true)} className="border border-gray-200 p-2 rounded-full flex items-center shadow-md hover:shadow">
        //     <img src={plusImg} alt="create_event" className="h-7 w-7" />
        //     <span className="pl-3 pr-7">Create</span>
        // </button>
        <>
            {isAuth &&
                <Button onClick={() => setShowEventModal(true)} customClass="w-full">
                    {/*<span className="material-icons-outlined text-sm">add</span>*/}
                    <span className="pl-3 pr-7">Create shift</span>
                </Button>}
        </>
    );
};

export default CreateEventButton;
