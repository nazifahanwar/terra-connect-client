import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import Card from '../Components/Card';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axios.get('http://localhost:5000/challenges'); 
        setChallenges(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) return <Loader></Loader>;

  return (
    <div className='container mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {challenges.map((challenge) => (
        <Card key={challenge._id} challenge={challenge} />
      ))}
    </div>
    </div>
  );
};

export default Challenges;
