import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Card from './Card'

const ActiveChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://tera-connect-server.vercel.app/challenges/active')
      .then(res => setChallenges(res.data))

      setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="container mx-auto mt-10 px-4">
  <h2 className="text-3xl font-bold text-[#22577a] mb-2 text-center">Active Challenges</h2>
      <p className="text-accent mb-3 text-center">Jump in and make an impact.See what’s happening now!</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {challenges.slice(0, 6).map(challenge => (
          <Card key={challenge._id} challenge={challenge} />
        ))}
      </div>
    </section>
  );
};

export default ActiveChallenges;
