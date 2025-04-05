import axios from "axios";
import {addUsersAction} from "../store/fakeUserReducer.js";

export const fakeUsers = () => {
    return async (dispatch) => {
        try {
            const url = 'https://jsonplaceholder.typicode.com/users';
            const response = await axios.get(url);
            const data = await response.data;

            dispatch(addUsersAction(data))

        } catch (e) {
            console.error(e)
        }
    }
}
