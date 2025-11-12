import React from "react";
import { FaLeaf, FaGlobeAmericas, FaHeart, FaRecycle } from "react-icons/fa";

const WhyGoGreen = () => {
  return (
    <section className="container mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-[#22577a] mb-2 text-center">Why Go Green?</h2>
      <p className="text-accent mb-3 text-center">Choosing sustainability is choosing a better tomorrow — for you, your community, and the planet.</p>
      <div className="grid sm:grid-cols-2 gap-6 text-left">
        <div className="flex items-center gap-4 bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition">
          <FaLeaf className="text-green-600 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-[#22577a]">Healthier Planet</h3>
            <p className="text-gray-600">
              Less pollution means cleaner air, fresher water, and thriving ecosystems.
            </p>
          </div>
        </div>

        <div className="flex  items-center gap-4 bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition">
          <FaGlobeAmericas className="text-blue-600 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-[#22577a]">Fight Climate Change</h3>
            <p className="text-gray-600">
              Simple eco-friendly choices help slow global warming and protect future generations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition">
          <FaHeart className="text-red-500 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-[#22577a]">Better Quality of Life</h3>
            <p className="text-gray-600">
              Sustainable living builds cleaner, calmer, and more connected communities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition">
          <FaRecycle className="text-yellow-600 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-lg text-[#22577a]">Resource Conservation</h3>
            <p className="text-gray-600">
              Reducing waste protects natural resources and ensures a livable planet for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGoGreen;
