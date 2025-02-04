import React, {useState} from 'react';
import axios from "axios";

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Имя:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Должность:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Добавить сотрудника</button>
        </form>
    );
};

export default AddEmployee;
