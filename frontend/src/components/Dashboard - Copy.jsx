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
      <button onClick={handleLogout} className="bg-blue-500 text-white p-2 rounded-md">Logout</button>
    </div>
	
	<div className="App bg-transparent flex flex-col items-start p-4">
	<section className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
        <input name="title" placeholder="Title" value={newTodo.title} onChange={handleInputChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" required />
        <input name="description" placeholder="Description" value={newTodo.description} onChange={handleInputChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />

        <select name="gender" value={newTodo.gender} onChange={handleInputChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="date" name="date_of_birth" value={newTodo.date_of_birth} onChange={handleInputChange}  className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />
        <input name="phone_number" placeholder="Phone Number" value={newTodo.phone_number} onChange={handleInputChange} />
        <input name="address" placeholder="Address" value={newTodo.address} onChange={handleInputChange} />
        <input type="date" name="enrollment_date" value={newTodo.enrollment_date} onChange={handleInputChange} />
        <input name="course" placeholder="Course" value={newTodo.course} onChange={handleInputChange} />
        <input name="gpa" placeholder="GPA" value={newTodo.gpa} onChange={handleInputChange} />
        
        <label>
          Active:
          <input type="checkbox" name="is_active" checked={newTodo.is_active} onChange={handleInputChange} />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
      </form>
	  </section>
      </div>
	  
      <h3>You Record</h3>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            <strong>{todo.title}:</strong><br/> 
			{todo.description}<br/>
			{todo.gender}<br/>
			date_of_birth:{todo.date_of_birth}<br/>
			{todo.phone_number}<br/>
			{todo.address}<br/>
			date_of_enrollment:{todo.enrollment_date}<br/>
			{todo.course}<br/>
			{todo.gpa}<br/>
			{todo.is_active}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
