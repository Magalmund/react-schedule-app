// import React, {useState} from 'react';
// import axios from "axios";
//
// const AddEmployee = () => {
//     const [name, setName] = useState('');
//     const [position, setPosition] = useState('');
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5001/api/employees', {
//                 name,
//                 position,
//             });
//             alert('Сотрудник успешно добавлен');
//             setName('');
//             setPosition('');
//         } catch (error) {
//             console.error('Ошибка при добавлении сотрудника:', error);
//             alert('Ошибка при добавлении сотрудника');
//         }
//     }
//     return (
//         <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mt-9">Add employee:</h2>
//             <form onSubmit={handleSubmit} className="mt-4">
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
//                     <input
//                         type="text"
//                         value={position}
//                         onChange={(e) => setPosition(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     Add
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default AddEmployee;
