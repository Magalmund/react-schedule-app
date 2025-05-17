import axios from "axios";

export const getAllEmployees = async (setEmployees) => {
    try {
        const response = await axios.get('http://localhost:5001/api/employees');
        const employeesData = response.data;

        setEmployees(prevEmployees => [...prevEmployees, ...employeesData]);

    } catch (error) {
        console.error('Error getting employees from database:', error);
        alert('Error getting employees from database')
    }
}
