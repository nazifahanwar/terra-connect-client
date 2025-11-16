import React, { useEffect, useState } from "react";
import axios from "axios";

const CommunityStats = () => {
  const [stats, setStats] = useState(null); // null while loading

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://tera-connect-server.vercel.app/community-totals");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching community stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

 
if (stats){
return (
    <section className="container mx-auto mt-10 px-4">
  <h2 className="text-3xl font-bold text-[#22577a] mb-2 text-center">Community Impact</h2>
      <p className="text-accent mb-3 text-center">See how our collective actions are making the world greener,from plastic saved to energy conserved and trees planted.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="stat-card  rounded p-4 shadow-md bg-base-300 text-center hover:scale-105 transition ease-in-out">
        <h3 className="font-bold text-xl text-white">Plastic Saved</h3>
        <p className="text-3xl mt-2 font-semibold text-white">{stats.plasticSaved} kg</p>
      </div>

      <div className="stat-card bg-base-300 rounded p-4 shadow-md text-center hover:scale-105 transition ease-in-out">
        <h3 className="font-bold text-xl text-white">Energy Saved</h3>
        <p className="text-3xl mt-2 font-semibold text-white">{stats.kwhSaved} kWh</p>
      </div>

      <div className="stat-card bg-base-300 rounded p-4 shadow-md text-center hover:scale-105 transition ease-in-out">
        <h3 className="font-bold text-xl text-white">Trees Planted</h3>
        <p className="text-3xl mt-2 font-semibold text-white">{stats.treesPlanted}</p>
      </div>
    </div>
</section>
  );
}
  
};

export default CommunityStats;
