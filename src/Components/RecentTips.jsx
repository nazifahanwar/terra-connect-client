import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";

const RecentTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await axios.get("https://tera-connect-server.vercel.app/tips");
        const sortedTips = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setTips(sortedTips);
      } catch (err) {
        console.error("Failed to fetch tips:", err);
      }
    };

    fetchTips();
  }, []);

  return (
    <section className="container mx-auto mt-10 px-4">
  <h2 className="text-3xl font-bold text-[#22577a] mb-2 text-center">Recent Tips</h2>
      <p className="text-accent mb-3 text-center">Latest 5 community tips to help you live sustainably and reduce waste.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div
            key={tip._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                  {tip.authorName ? tip.authorName[0] : "?"}
                </div>
                <span className="font-semibold text-gray-800">
                  {tip.authorName}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(tip.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{tip.content}</p>

            <div className="flex items-center gap-2 text-gray-600">
              <FaThumbsUp />
              <span>{tip.upvotes}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTips;
