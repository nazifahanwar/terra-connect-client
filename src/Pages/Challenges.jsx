import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import Card from '../Components/Card';
import { Link } from 'react-router';
import { IoIosAddCircle } from "react-icons/io";


const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');


  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axios.get('http://localhost:5000/challenges'); 
        setChallenges(res.data);
        setFilteredChallenges(res.data); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);
useEffect(() => {
    let temp = [...challenges];

    if (categoryFilter) {
      temp = temp.filter(ch => ch.category === categoryFilter); 
    }

    if (startDateFilter) {
      temp = temp.filter(ch => new Date(ch.startDate) >= new Date(startDateFilter)); 
    }

    setFilteredChallenges(temp);
  }, [categoryFilter, startDateFilter, challenges]);
  if (loading) return <Loader></Loader>;

  return (
    <div className="container mx-auto p-4">
     <div className='flex justify-between'>
       <div className="flex gap-4 mb-6"> 
        <select
          className="select select-bordered"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Waste Reduction">Waste Reduction</option>
          <option value="Energy Conservation">Energy Conservation</option>
          <option value="Water Conservation">Water Conservation</option>
          <option value="Sustainable Transport">Sustainable Transport</option>
          <option value="Green Living">Green Living</option>
          <option value="Sustainable Living">Sustainable Living</option>
        </select>
          
          <input
          type="date"
          className="input input-bordered"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
        />
      </div>
<Link to="/challenges/add"><button className='flex items-center btn btn-primary  btn-outline'><span><IoIosAddCircle/></span> <span>Add Challenge</span></button></Link>
     </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredChallenges.map((challenge) => ( 
          <Card key={challenge._id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default Challenges;
