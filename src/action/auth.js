import axios from "axios";
import {setUser} from "../store/userReducer.js";

export const login = (email, password) => {
    console.log(password);
    console.log(email);
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5001/api/login`, {email,password});
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.log(error.response.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5001/api/auth`,
                {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
                );
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.log(error.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
