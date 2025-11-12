import React from "react";
import { GoGoal } from "react-icons/go";
import { VscGraphLine } from "react-icons/vsc";
import { TbBrandStackshare } from "react-icons/tb";
import Pic from '../assets/howitworks.jpg'

const HowItWorks = () => {
  return (
        <section className="container mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-[#22577a] mb-2 text-center">How It Works</h2>
      <p className="text-accent mb-3 text-center">Just three steps to start your sustainable journey.</p>
       <div className="flex flex-col lg:flex-row  items-center gap-10">
        <div className="lg:w-1/2 ">
          <img
            src={Pic}
            alt="two child helping to collect beach trash"
            className="rounded-2xl shadow-lg w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col relative border-l border-gray-300 pl-8">
          <div className="mb-8 flex items-start gap-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full shadow-sm">
              <GoGoal className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#22577a]">
                Join a Challenge
              </h3>
              <p className="text-gray-600">
                Choose an eco challenge that inspires you and start your mission.
              </p>
            </div>
          </div>

          <div className="mb-8 flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full shadow-sm">
              <VscGraphLine className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#22577a]">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Stay motivated by tracking your eco-friendly actions and growth.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full shadow-sm">
              <TbBrandStackshare className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#22577a]">
                Share Tips
              </h3>
              <p className="text-gray-600">
                Inspire others by sharing creative sustainability ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
