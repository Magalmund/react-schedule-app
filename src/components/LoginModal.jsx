import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../action/auth.js";
import Modal from "./UI/modal/Modal.jsx";
import Input from "./UI/input/Input.jsx";
import GlobalContext from "../context/GlobalContext.jsx";
import Button from "./UI/button/Button.jsx";

const LoginModal = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setShowLoginModal} = useContext(GlobalContext);

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(login(email, password));
        setShowLoginModal(false);
    }

    return (
        <Modal setShowModal={setShowLoginModal} onSubmit={handleSubmit}>
            <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer flex items-center mr-auto"
            >
                <span className="material-icons-outlined">close</span>
            </button>
            <div className="content-header p-[1.25rem 1.5rem 0 1.25rem] text-center mt-4">
                <h2 className="text-[#31344b] text-2xl">Sign in to our platform</h2>
                <span>Login here using your username and password</span>
            </div>
            <div className="content-body flex-[1_1_0] block flex-wrap p-[1.5rem]">
                <div className="mt-4">
                    <div className="form-group">
                        <label className="inline-block mb-[.5rem] text-[.875rem]">
                            Your email
                        </label>
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <div className="flex">
                                <span
                                    className="material-icons-outlined flex items-center p-[.6rem_.75rem] mb-0 text-[1rem] text-[#44476a] text-center whitespace-nowrap bg-[#e6e7ee] border-[.0625rem] border-solid border-[#d1d9e6] rounded-lg rounded-br-none rounded-tr-none">
                                    email
                                </span>
                            </div>
                            <Input
                                customClass="!rounded-tl-none !rounded-bl-none !border-l-[0px] flex-[1_1_0]"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="inline-block mb-[.5rem] text-[.875rem]">
                            Password
                        </label>
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <div className="flex">
                                <span
                                    className="material-icons-outlined flex items-center p-[.6rem_.75rem] mb-0 text-[1rem] text-[#44476a] text-center whitespace-nowrap bg-[#e6e7ee] border-[.0625rem] border-solid border-[#d1d9e6] rounded-lg rounded-br-none rounded-tr-none">
                                    lock
                                </span>
                            </div>
                            <Input
                                customClass="!rounded-tl-none !rounded-bl-none !border-l-[0px] flex-[1_1_0]"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button customClass="w-full" type="submit">Login</Button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
