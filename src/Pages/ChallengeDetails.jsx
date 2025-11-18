import React, { use, useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaBullseye } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useLoaderData } from "react-router";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "sonner";

const ChallengeDetails = () => {
  const{user}= use(AuthContext)
  const challenge = useLoaderData(); 
  const [userJoined, setUserJoined] = useState(false);

  

 useEffect(() => {
    const fetchUserChallenge = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`https://tera-connect-server.vercel.app/user-challenges?buyer_email=${user.email}`);
        const joined = res.data.find(uc => uc.challenge_id === challenge._id);
        if (joined) setUserJoined(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserChallenge();
  }, [challenge._id, user?.email]);

  const joinChallenge = async () => {
    if (!user?.email) return alert("Login first!");

      await axios.post(`https://tera-connect-server.vercel.app/challenges/join/${challenge._id}`, {
        buyer_email: user.email
      });
      setUserJoined(true);
      toast.success("Successfully joined!");
      
  };
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl flex flex-col lg:flex-row gap-8">
      <img
        src={challenge.imageUrl}
        alt={challenge.title}
        className="w-full lg:w-1/2 h-64 lg:h-auto object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-[#22577a]">{challenge.title}</h2>
        <p className="text-gray-500 mt-1 italic">{challenge.category}</p>
        <p className="mt-4 text-gray-700">{challenge.description}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#22577a]" />
            <span>
              {new Date(challenge.startDate).toLocaleDateString()} -{" "}
              {new Date(challenge.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <VscAccount className="text-[#22577a]" />
            <span>{challenge.createdBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBullseye className="text-[#22577a]" />
            <div className="flex gap-1">
              <span>Target:You have to make {challenge.target}</span>
              <span>{challenge.impactMetric}</span>
            </div>
          </div>
         
        </div>

        <div className="mt-6">
          {!userJoined ? (
            <button
              onClick={joinChallenge}
              className="w-full bg-[#22577a] text-white p-3 rounded-lg hover:bg-[#1b3f55] transition"
            >
              Join Challenge
            </button>
          ) : (
            <button
              className="w-full bg-gray-400 text-white p-3 rounded-lg cursor-not-allowed"
              disabled
            >
              Joined
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
