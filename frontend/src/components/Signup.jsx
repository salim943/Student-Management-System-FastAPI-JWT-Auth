import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ email: '', name: '', age: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
  const res = await fetch('https://student-management-system-zxti.onrender.com/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Signup successful!");
      navigate('/login');
    } else {
      alert("Signup failed.");
    }
  };

  return (
      <div className="App bg-transparent flex flex-col items-center p-4">
	  <h1 className="text-3xl font-bold text-gray-800 mb-6">Signup</h1>
	  	   <section className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-8">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" required />
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" required />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500" required />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Register</button>
    </form>
	</section>
	</div>
  );
}

export default Signup;
