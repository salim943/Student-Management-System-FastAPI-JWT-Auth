import React, { useEffect, useState } from 'react';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    gender: 'other',
    date_of_birth: '',
    phone_number: '',
    address: '',
    enrollment_date: '',
    course: '',
    gpa: '',
    is_active: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('https://student-management-system-zxti.onrender.com/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos || []);
      })
      .catch(() => alert('Error fetching user data'));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    fetch('https://student-management-system-zxti.onrender.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]);
        setNewTodo({
          title: '',
          description: '',
          gender: 'other',
          date_of_birth: '',
          phone_number: '',
          address: '',
          enrollment_date: '',
          course: '',
          gpa: '',
          is_active: true,
        });
      })
      .catch(() => alert('Error adding todo'));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
<div className="App bg-transparent flex flex-col items-start p-4">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h2>

  {/* Logout Button */}
  <div className="mt-4 flex justify-end w-full">
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300">
      Logout
    </button>
  </div>
</div>

<h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Records</h3>
<div className="mt-4 flex justify-start">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
          onClick={() => handleUpdateClick(todo)}
        >
          Update
        </button>
		</div>
<ul className="space-y-4">
  {todos.map((todo, i) => (
    <li
      key={i}
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
    >
      <div className="space-y-2">
        <div className="font-semibold text-lg text-blue-500">{todo.title}</div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Description:</strong> {todo.description}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Gender:</strong> {todo.gender}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Date of Birth:</strong> {todo.date_of_birth}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Phone Number:</strong> {todo.phone_number}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Address:</strong> {todo.address}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Enrollment Date:</strong> {todo.enrollment_date}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Course:</strong> {todo.course}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">GPA:</strong> {todo.gpa}
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">Active:</strong>{' '}
          {todo.is_active ? 'Yes' : 'No'}
        </div>
      </div>
    </li>
  ))}
</ul>
	
<div className="App bg-transparent flex justify-center items-center min-h-screen p-4">
  <section className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mb-8">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800">Update Profile</h3>
      
      {/* Title */}
      <input 
        name="title" 
        placeholder="Title" 
        value={newTodo.title} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" 
        required 
      />
      
      {/* Description */}
      <input 
        name="description" 
        placeholder="Description" 
        value={newTodo.description} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" 
      />
      
      {/* Gender */}
      <select 
        name="gender" 
        value={newTodo.gender} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      {/* Date of Birth */}
      <input 
        type="date" 
        name="date_of_birth" 
        value={newTodo.date_of_birth} 
        onChange={handleInputChange}  
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* Phone Number */}
      <input 
        name="phone_number" 
        placeholder="Phone Number" 
        value={newTodo.phone_number} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* Address */}
      <input 
        name="address" 
        placeholder="Address" 
        value={newTodo.address} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* Enrollment Date */}
      <input 
        type="date" 
        name="enrollment_date" 
        value={newTodo.enrollment_date} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* Course */}
      <input 
        name="course" 
        placeholder="Course" 
        value={newTodo.course} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* GPA */}
      <input 
        name="gpa" 
        placeholder="GPA" 
        value={newTodo.gpa} 
        onChange={handleInputChange} 
        className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      {/* Active checkbox */}
      <div className="flex items-center space-x-2">
        <label className="text-gray-700">Active:</label>
        <input 
          type="checkbox" 
          name="is_active" 
          checked={newTodo.is_active} 
          onChange={handleInputChange} 
          className="focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="bg-blue-500 text-white py-3 rounded-md w-full hover:bg-blue-600 transition duration-200 focus:outline-none"
      >
        Submit
      </button>
    </form>
  </section>
</div>

    </div>
  );
}

export default Dashboard;
