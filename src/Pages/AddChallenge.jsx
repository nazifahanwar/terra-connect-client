import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddChallenge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    target: '',
    impactMetric: '',
    createdBy: '',
    startDate: '',
    endDate: '',
    imageUrl: ''
  });

  const categories = [
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
    "Sustainable Living"
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://tera-connect-server.vercel.app/challenges', formData);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire('Success', 'Challenge created successfully!', 'success');
        navigate('/challenges');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to create challenge', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Challenge</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full" required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
        <input type="number" name="duration" placeholder="Duration (Days)" value={formData.duration} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="target" placeholder="Target(Numbers)" value={formData.target} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="impactMetric" placeholder="Impact Metric" value={formData.impactMetric} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="email" name="createdBy" placeholder="Please provide the email you registered with." value={formData.createdBy} onChange={handleChange} className="input input-bordered w-full" required />
       <div className="flex gap-2">
  <div className="flex flex-col w-full">
    <label className="text-sm mb-1">Start Date</label>
    <input 
      type="date" 
      name="startDate" 
      value={formData.startDate} 
      onChange={handleChange} 
      className="input input-bordered w-full" 
      required 
    />
  </div>
  <div className="flex flex-col w-full">
    <label className="text-sm mb-1">End Date</label>
    <input 
      type="date" 
      name="endDate" 
      value={formData.endDate} 
      onChange={handleChange} 
      className="input input-bordered w-full" 
      required 
    />
  </div>
</div>
        <input type="url" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-primary btn-outline">Create Challenge</button>
      </form>
    </div>
  );
};

export default AddChallenge;

       